from flask import Flask, request, jsonify
import paypalrestsdk

app = Flask(__name__)

# Configure PayPal SDK
paypalrestsdk.configure({
    "mode": "sandbox",  # Change to "live" for production
    "client_id": "AcEIXRvF3NxGBY0PmDonJXfXI-GwovndxtAanVhVNHw1ZxtJGMGrINvxe0aejuypEzhF_NXgt7rDbdgG",
    "client_secret": "EAL2RrpGRkg-ovCOw5LZeESngjAVWYRVDUttGYYuDalpIAP0ieMij_xpQYyi8FWX8zS3pooemwjJ-mvP"
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
        # Extract approval URL for the buyer to approve the payment
        for link in payment.links:
            if link.rel == "approval_url":
                return jsonify({
                    "approval_url": link.href,
                    "payment_id": payment.id
                })
    else:
        # Log errors for debugging
        print(payment.error)
        return jsonify({"error": payment.error}), 500


@app.route("/payment_success", methods=["GET"])
def payment_success():
    payment_id = request.args.get("paymentId")
    payer_id = request.args.get("PayerID")

    payment = paypalrestsdk.Payment.find(payment_id)
    if payment.execute({"payer_id": payer_id}):
        return "Payment executed successfully!"
    else:
        print(payment.error)
        return "Payment execution failed."


@app.route("/payment_cancel", methods=["GET"])
def payment_cancel():
    return "Payment cancelled by user."


if __name__ == '__main__':
    import os

# Enable debug mode only if the FLASK_ENV environment variable is set to "development"
app.run(debug=os.getenv("FLASK_ENV") == "development")

