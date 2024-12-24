document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

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

    // Initial cart total update
    updateCartTotal();
});
