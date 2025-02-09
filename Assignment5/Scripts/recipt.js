document.addEventListener("DOMContentLoaded", () => {
    const receiptBody = document.getElementById("receipt-body");
    const grandTotalCell = document.getElementById("grand-total");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updateCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderReceipt();
    };

    const renderReceipt = () => {
        receiptBody.innerHTML = "";
        let grandTotal = 0;

        cart.forEach((product, index) => {
            product.quantity = product.quantity || 1;
            let total = product.price * product.quantity;
            grandTotal += total;

            let row = document.createElement("tr");
            row.innerHTML = `   
                <td>${product.title}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">➖</button>
                    <span>${product.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">➕</button>
                </td>

                <td>$${total.toFixed(2)}</td>
            `;
            receiptBody.appendChild(row);
        });

        grandTotalCell.textContent = `$${grandTotal.toFixed(2)}`;
    };

    window.updateQuantity = (index, change) => {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
            updateCart();
        }
    };

    document.getElementById("clearStorage").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "products.html";
    });

    renderReceipt();
});
