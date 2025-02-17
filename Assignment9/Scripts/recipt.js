document.addEventListener("DOMContentLoaded", function () {
    var _a, _b;
    var receiptBody = document.getElementById("receipt-body");
    var grandTotalCell = document.getElementById("grand-total");
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    var updateCart = function () {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderReceipt();
    };
    var renderReceipt = function () {
        receiptBody.innerHTML = "";
        var grandTotal = 0;
        cart.forEach(function (product, index) {
            product.quantity = product.quantity || 1;
            var total = product.price * product.quantity;
            grandTotal += total;
            var row = document.createElement("tr");
            row.innerHTML = "   \n                <td>".concat(product.title, "</td>\n                <td>$").concat(product.price.toFixed(2), "</td>\n                <td>\n                    <button data-index=\"").concat(index, "\" data-change=\"-1\">\u2796</button>\n                    <span>").concat(product.quantity, "</span>\n                    <button data-index=\"").concat(index, "\" data-change=\"1\">\u2795</button>\n                </td>\n                <td>$").concat(total.toFixed(2), "</td>\n            ");
            receiptBody.appendChild(row);
        });
        grandTotalCell.textContent = "$".concat(grandTotal.toFixed(2));
    };
    var updateQuantity = function (index, change) {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
            updateCart();
        }
    };
    (_a = document.getElementById("receipt-table")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (event) {
        var target = event.target;
        if (target.tagName === "BUTTON" && target.dataset.index !== undefined && target.dataset.change !== undefined) {
            updateQuantity(parseInt(target.dataset.index), parseInt(target.dataset.change));
        }
    });
    (_b = document.getElementById("clearStorage")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        localStorage.clear();
        window.location.href = "products.html";
    });
    renderReceipt();
});
