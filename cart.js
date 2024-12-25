document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const discountCodeInput = document.getElementById('discount-code');
    const applyDiscountButton = document.getElementById('apply-discount');

    // Function to update the cart total
    function updateCartTotal() {
        let total = 0;
        const items = cartItems.querySelectorAll('.cart-item');
        items.forEach(item => {
            const itemTotal = parseFloat(item.querySelector('.item-total').textContent.replace('$', ''));
            total += itemTotal;
        });
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Event listener for removing items
    cartItems.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const productId = event.target.getAttribute('data-product-id');
            // Remove the item from the cart (you'll need to implement this on the server side)
            fetch(`/remove_from_cart/${productId}`, { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        event.target.closest('.cart-item').remove();
                        updateCartTotal();
                    }
                });
        }
    });

    // Event listener for saving items for later
    cartItems.addEventListener('click', function(event) {
        if (event.target.classList.contains('save-btn')) {
            const productId = event.target.getAttribute('data-product-id');
            // Save the item for later (you'll need to implement this on the server side)
            fetch(`/save_for_later/${productId}`, { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        event.target.closest('.cart-item').remove();
                        updateCartTotal();
                    }
                });
        }
    });

    // Event listener for quantity change
    cartItems.addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity-input')) {
            const productId = event.target.getAttribute('data-product-id');
            const newQuantity = event.target.value;
            // Update the quantity on the server side
            fetch(`/update_quantity/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: newQuantity })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update the item total and cart total
                    const item = event.target.closest('.cart-item');
                    item.querySelector('.item-total').textContent = `$${data.new_total}`;
                    updateCartTotal();
                }
            });
        }
    });

    // Event listener for applying discount code
    applyDiscountButton.addEventListener('click', function() {
        const discountCode = discountCodeInput.value;
        // Apply the discount code on the server side
        fetch(`/apply_discount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ discount_code: discountCode })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the cart total with the discount applied
                updateCartTotal();
            }
        });
    });

    // Initial cart total update
    updateCartTotal();
});
