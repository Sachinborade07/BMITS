document.addEventListener("DOMContentLoaded", function () {
    displayCart();
    var billButton = document.getElementById("bill");
    if (billButton) {
        billButton.addEventListener("click", generateBill);
    }
});
function displayCart() {
    var cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer)
        return;
    cartItemsContainer.innerHTML = "";
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        return;
    }
    cart.forEach(function (product) {
        var div = document.createElement("div");
        div.className = "cart-items";
        div.innerHTML = "\n            <p><b>".concat(product.title, "</b></p>\n            <img src=\"").concat(product.image, "\" alt=\"").concat(product.title, "\" style=\"height: 200px; object-fit: contain;\">\n            <p><b>Price:</b> $").concat(product.price, "</p>\n            <p><b>Quantity:</b> ").concat(product.quantity || 1, "</p>\n        ");
        cartItemsContainer.appendChild(div);
    });
}
function generateBill() {
    window.location.href = "recipt.html";
}
