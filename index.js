document.addEventListener('DOMContentLoaded', () => {
    // Dropdown Menu Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseover', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'block';
            }
        });

        dropdown.addEventListener('mouseout', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'none';
            }
        });
    });

    // Scrolling Feature with Scrollbar
    const scrollingSections = document.querySelectorAll('.scrolling-container');
    scrollingSections.forEach(container => {
        const parentSection = container.closest('section');
        if (!parentSection) return;

        const scrollBar = document.createElement('div');
        scrollBar.classList.add('scroll-bar');

        const scrollThumb = document.createElement('div');
        scrollThumb.classList.add('scroll-thumb');
        scrollBar.appendChild(scrollThumb);

        parentSection.appendChild(scrollBar);

        const updateThumbPosition = () => {
            const scrollWidth = container.scrollWidth - container.clientWidth;
            const thumbWidth = Math.max(50, (container.clientWidth / container.scrollWidth) * 100);
            const scrollLeft = container.scrollLeft;

            scrollThumb.style.width = thumbWidth + '%';
            scrollThumb.style.transform = 'translateX(' + ((scrollLeft / scrollWidth) * 100) + '%)';
        };

        // Update thumb position on scroll
        container.addEventListener('scroll', updateThumbPosition);

        // Handle thumb dragging
        let isDragging = false;
        scrollThumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            const startX = e.clientX;
            const startScrollLeft = container.scrollLeft;

            const onMouseMove = (e) => {
                if (!isDragging) return;
                const deltaX = e.clientX - startX;
                const scrollWidth = container.scrollWidth - container.clientWidth;
                const newScrollLeft = startScrollLeft + (deltaX / parentSection.offsetWidth) * scrollWidth;
                container.scrollLeft = Math.max(0, Math.min(scrollWidth, newScrollLeft));
            };

            const onMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        updateThumbPosition();
    });

    // Add Ripple Effect on Buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Scroll-triggered Animations
    const scrollElements = document.querySelectorAll('.product-card, .category, .testimonial-card');
    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, { threshold: 0.2 });

    scrollElements.forEach(element => scrollObserver.observe(element));
});
document.addEventListener('DOMContentLoaded', () => {
    let cart = []; // Array to hold cart items

    // Select cart modal elements
    const cartModal = document.createElement('div');
    cartModal.classList.add('cart-modal');
    cartModal.innerHTML = `
        <div class="cart-content">
            <h2>Your Cart</h2>
            <ul class="cart-items"></ul>
            <div class="cart-summary">
                <p>Total: $<span class="cart-total">0.00</span></p>
                <button class="checkout-btn">Checkout</button>
            </div>
            <button class="close-cart">&times;</button>
        </div>
    `;
    document.body.appendChild(cartModal);

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.product-card button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));

            // Add item to cart
            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    // Update Cart Display
    function updateCart() {
        const cartItemsElement = document.querySelector('.cart-items');
        const cartTotalElement = document.querySelector('.cart-total');

        // Clear current cart display
        cartItemsElement.innerHTML = '';

        // Populate cart with items
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsElement.appendChild(li);
            total += item.price;
        });

        // Update total
        cartTotalElement.textContent = total.toFixed(2);

        // Attach event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Show/Hide Cart Modal
    const closeCartButton = document.querySelector('.close-cart');
    const checkoutButton = document.querySelector('.checkout-btn');
    cartModal.style.display = 'none';

    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            cartModal.style.display = 'block';
        });
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Checkout Button Action
    checkoutButton.addEventListener('click', () => {
        alert(`Thank you for your purchase! Total: $${document.querySelector('.cart-total').textContent}`);
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    });
});
const slider = document.querySelector('.product-grid');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let currentScroll = 0;
const cardWidth = 220; // Width of product card + gap

// Scroll Right
rightArrow.addEventListener('click', () => {
    currentScroll -= cardWidth;
    slider.style.transform = `translateX(${currentScroll}px)`;
    updateButtons();
});

// Scroll Left
leftArrow.addEventListener('click', () => {
    currentScroll += cardWidth;
    slider.style.transform = `translateX(${currentScroll}px)`;
    updateButtons();
});

// Enable/Disable Arrows
function updateButtons() {
    const maxScroll = -(slider.scrollWidth - slider.clientWidth);
    rightArrow.disabled = currentScroll <= maxScroll;
    leftArrow.disabled = currentScroll >= 0;
}

// Initialize Buttons
updateButtons();
