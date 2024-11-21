document.addEventListener('DOMContentLoaded', function () {
    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    var modal = document.getElementById('myModal');
    var closeButton = document.querySelector('.close');
    var viewCartButton = document.querySelector('.view-cart');

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default behavior of the anchor tag
            modal.style.display = 'block'; // Display the modal
        });
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none'; // Hide the modal when close button is clicked
    });

    viewCartButton.addEventListener('click', function () {
        // Add functionality to the "View Cart" button
        // For demonstration, let's just log a message
        console.log('View Cart clicked');
    });
});