from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import paypalrestsdk

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///calidef.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)

# Configure PayPal
paypalrestsdk.configure({
    "mode": "sandbox",  # sandbox or live
    "client_id": "your_paypal_client_id",
    "client_secret": "your_paypal_client_secret"
})

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(100))
    address = db.Column(db.String(255))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    description = db.Column(db.Text)

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='pending')

# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(email=data['email'], password_hash=hashed_password, name=data.get('name'), address=data.get('address'))
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        session['user_id'] = user.id
        return jsonify({"message": "Login successful!"})
    return jsonify({"message": "Invalid email or password."}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully!"})

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "category": product.category,
        "image_url": product.image_url,
        "description": product.description
    } for product in products])

@app.route('/cart', methods=['GET', 'POST', 'DELETE'])
def manage_cart():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"message": "User not logged in."}), 401

    if request.method == 'GET':
        cart_items = CartItem.query.filter_by(user_id=user_id).all()
        return jsonify([{
            "id": item.id,
            "product_id": item.product_id,
            "quantity": item.quantity
        } for item in cart_items])

    elif request.method == 'POST':
        data = request.json
        cart_item = CartItem(user_id=user_id, product_id=data['product_id'], quantity=data['quantity'])
        db.session.add(cart_item)
        db.session.commit()
        return jsonify({"message": "Item added to cart!"})

    elif request.method == 'DELETE':
        data = request.json
        CartItem.query.filter_by(id=data['id'], user_id=user_id).delete()
        db.session.commit()
        return jsonify({"message": "Item removed from cart!"})

@app.route('/checkout', methods=['POST'])
def checkout():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"message": "User not logged in."}), 401

    data = request.json
    total_amount = data['total_amount']

    # Create PayPal payment
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/payment/execute",
            "cancel_url": "http://localhost:5000/payment/cancel"
        },
        "transactions": [{
            "amount": {
                "total": f"{total_amount:.2f}",
                "currency": "USD"
            },
            "description": "CaliDef Collectables Purchase"
        }]
    })

    if payment.create():
        return jsonify({"payment_id": payment.id, "redirect_url": payment.links[1].href})
    else:
        return jsonify({"message": "Payment creation failed."}), 500

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
