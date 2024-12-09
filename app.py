from flask import Flask, request, jsonify
import paypalrestsdk

app = Flask(__name__)

# Configure PayPal
paypalrestsdk.configure({
    "mode": "sandbox",  # Use "live" for production
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
})

@app.route("/")
def home():
    return "Welcome to the PayPal Checkout Backend!"

@app.route("/create_payment", methods=["POST"])
def create_payment():
    data = request.json
    total_amount = data.get("total_amount", "10.00")
    currency = data.get("currency", "USD")
    return_url = data.get("return_url", "http://localhost:5000/payment_success")
    cancel_url = data.get("cancel_url", "http://localhost:5000/payment_cancel")

    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": return_url,
            "cancel_url": cancel_url
        },
        "transactions": [{
            "amount": {
                "total": total_amount,
                "currency": currency
            },
            "description": "Payment transaction"
        }]
    })

    if payment.create():
        for link in payment.links:
            if link.rel == "approval_url":
                return jsonify({"approval_url": link.href, "payment_id": payment.id})
    else:
        return jsonify({"error": payment.error}), 400

@app.route("/execute_payment", methods=["POST"])
def execute_payment():
    payment_id = request.json.get("payment_id")
    payer_id = request.json.get("payer_id")

    payment = paypalrestsdk.Payment.find(payment_id)
    if payment.execute({"payer_id": payer_id}):
        return jsonify({"message": "Payment executed successfully!", "payment": payment.to_dict()})
    else:
        return jsonify({"error": payment.error}), 400

if __name__ == "__main__":
    app.run(debug=True)
