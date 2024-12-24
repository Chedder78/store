document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const emailInput = document.getElementById("email-input");
    const emailSubmitButton = document.getElementById("email-submit-button");
    const shippingSubmitButton = document.getElementById("shipping-submit-button");
    const checkoutButton = document.getElementById("checkout-button");
    const shippingRequiredCheckbox = document.getElementById("shipping-required-checkbox");
    const shippingSection = document.getElementById("shipping");
    const paymentComponent = document.getElementById("payment-component");

    // Enable or disable the email "Continue" button
    emailInput.addEventListener("input", () => {
        emailSubmitButton.disabled = !emailInput.checkValidity();
    });

    // Simulate saving customer email
    emailSubmitButton.addEventListener("click", () => {
        const email = emailInput.value;
        if (email) {
            alert(`Email saved: ${email}`);
            document.getElementById("customer").classList.add("visited");
            shippingSection.classList.add("active");
        }
    });

    // Handle shipping form submission
    shippingSubmitButton.addEventListener("click", () => {
        const shippingInputs = Array.from(
            shippingSection.querySelectorAll("input")
        );
        const shippingData = shippingInputs.reduce((data, input) => {
            data[input.name] = input.value;
            return data;
        }, {});

        if (shippingRequiredCheckbox.checked) {
            if (
                !shippingData["given-name"] ||
                !shippingData["family-name"] ||
                !shippingData["address-line1"] ||
                !shippingData["address-level2"] ||
                !shippingData["postal-code"] ||
                !shippingData["country"]
            ) {
                alert("Please fill in all required shipping fields.");
                return;
            }
        }

        alert(`Shipping information saved:\n${JSON.stringify(shippingData)}`);
        shippingSection.classList.add("visited");
    });

    // Initialize PayPal Buttons
    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: "100.00" // Replace with your dynamic total
                        }
                    }
                ]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
                alert(`Payment completed by ${details.payer.name.given_name}`);
                window.location.href = "/payment_success";
            });
        },
        onError: (err) => {
            console.error(err);
            alert("An error occurred during payment.");
        }
    }).render(paymentComponent);

    // Checkout button handler
    checkoutButton.addEventListener("click", () => {
        if (!shippingRequiredCheckbox.checked || document.getElementById("shipping").classList.contains("visited")) {
            alert("Proceeding to payment...");
        } else {
            alert("Please complete the shipping step first.");
        }
    });
});
