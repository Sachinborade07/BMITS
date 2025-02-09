document.addEventListener("DOMContentLoaded", function () {
    function displayCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        cartItemsContainer.innerHTML = "";
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.forEach(product => {
            let div = document.createElement('div');
            div.className = 'cart-items';
            div.innerHTML = `
                <p><b>${product.title}</b></p>
                <img src="${product.image}" alt="${product.title}" style="height: 200px; object-fit: contain;">
                <p><b>Price:</b> $${product.price}</p>
                <p><b>Quantity:</b> ${product.quantity || 1}</p>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    function generateBill() {
        window.location.href = "recipt.html";
    }

    document.getElementById("bill").onclick = generateBill;

    displayCart();
});
