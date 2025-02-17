interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

document.addEventListener("DOMContentLoaded", () => {
    const receiptBody = document.getElementById("receipt-body") as HTMLTableSectionElement;
    const grandTotalCell = document.getElementById("grand-total") as HTMLTableCellElement;
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const updateCart = (): void => {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderReceipt();
    };

    const renderReceipt = (): void => {
        receiptBody.innerHTML = "";
        let grandTotal = 0;

        cart.forEach((product: CartItem, index: number) => {
            product.quantity = product.quantity || 1;
            let total = product.price * product.quantity;
            grandTotal += total;

            let row = document.createElement("tr");
            row.innerHTML = `   
                <td>${product.title}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button data-index="${index}" data-change="-1">➖</button>
                    <span>${product.quantity}</span>
                    <button data-index="${index}" data-change="1">➕</button>
                </td>
                <td>$${total.toFixed(2)}</td>
            `;
            receiptBody.appendChild(row);
        });

        grandTotalCell.textContent = `$${grandTotal.toFixed(2)}`;
    };

    const updateQuantity = (index: number, change: number): void => {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
            updateCart();
        }
    };

    document.getElementById("receipt-table")?.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === "BUTTON" && target.dataset.index !== undefined && target.dataset.change !== undefined) {
            updateQuantity(parseInt(target.dataset.index), parseInt(target.dataset.change));
        }
    });

    document.getElementById("clearStorage")?.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "products.html";
    });

    renderReceipt();
});
