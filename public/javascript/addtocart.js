document.addEventListener('DOMContentLoaded', function () {
    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    var modal = document.getElementById('myModal');
    var closeButton = document.querySelector('.close');
    var viewCartButton = document.querySelector('.view-cart');
    var cartDialog = document.getElementById('cart-dialog');
    var cartCloseButton = document.querySelector('.cart-close');
    var cartItemsContainer = document.getElementById('cart-items');

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            modal.style.display = 'block';
            var itemName = this.getAttribute('data-name');
            var itemPrice = parseFloat(this.getAttribute('data-price'));
            addToCart({ name: itemName, price: itemPrice });
        });
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    viewCartButton.addEventListener('click', function () {
        modal.style.display = 'none';
        cartDialog.style.left = '0';
        renderCart(); // Render cart items when viewing cart
    });

    // Add event listener to document to hide cart dialog when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!cartDialog.contains(event.target) && event.target !== viewCartButton) {
            cartDialog.style.left = '-300px';
        }
    });

    cartCloseButton.addEventListener('click', function () {
        cartDialog.style.left = '-300px';
    });

    // Function to render cart items
    function renderCart() {
        // Clear previous content
        cartItemsContainer.innerHTML = '';

        // Calculate total cost
        let totalCost = 0;
        cart.forEach(item => {
            totalCost += item.price;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-price">${item.price}</div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Display total cost
        const totalElement = document.createElement('div');
        totalElement.classList.add('total');
        totalElement.innerHTML = `Total: ₹${totalCost.toFixed(2)}`;
        cartItemsContainer.appendChild(totalElement);

        // Add "Place Order" button
        const placeOrderButton = document.createElement('a');
        placeOrderButton.classList.add('btn', 'btn-primary', 'place-order');
        placeOrderButton.textContent = 'Place Order';
        cartItemsContainer.appendChild(placeOrderButton);
    }

    // Event listener for "Place Order" button
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('place-order')) {
            // Add functionality to place order

            let username = document.getElementById('username').innerHTML;

            postRequest('/cart', { username: username, items: cart })
            .then(response => {
                console.log(response);
                if (response.ok) {
                    alert('Order Placed Successfully!');
                    cart = []; // Clear cart after placing order
                    renderCart(); // Render cart items after clearing the cart
                    localStorage.setItem('cartItems', JSON.stringify(cart)); // Save cart items to localStorage
                } else {
                    alert('Failed to place order');
                }
            });
        }
    });

    // Sample cart state (initially empty)
    let cart = [];

    // Function to add item to cart
    function addToCart(item) {
        // Generate a unique ID for the item (for simplicity, using the current timestamp)
        // const itemId = Date.now();
        // item.id = itemId;
        cart.push(item);
        renderCart(); // Render cart items after adding an item
        // Save cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }

    function postRequest(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    // Function to remove item from cart
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        renderCart(); // Render cart items after removing an item
        // Save cart items to localStorage after removing an item
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }

    // Event listener for "Remove" buttons
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const itemId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(itemId);
        }
    });

    // Function to initialize the cart when the page loads
    document.addEventListener('DOMContentLoaded', function () {
        // Retrieve cart items from localStorage
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            cart = JSON.parse(storedCartItems);
            renderCart(); // Render cart items when the page loads
        }
    });
});
