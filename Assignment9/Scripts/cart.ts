interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity?: number;
}

document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    const billButton = document.getElementById("bill");
    if (billButton) {
        billButton.addEventListener("click", generateBill);
    }
});

function displayCart(): void {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        return;
    }

    cart.forEach((product: CartItem) => {
        const div = document.createElement("div");
        div.className = "cart-items";
        div.innerHTML = `
            <p><b>${product.title}</b></p>
            <img src="${product.image}" alt="${product.title}" style="height: 200px; object-fit: contain;">
            <p><b>Price:</b> $${product.price}</p>
            <p><b>Quantity:</b> ${product.quantity || 1}</p>
        `;
        cartItemsContainer.appendChild(div);
    });
}

function generateBill(): void {
    window.location.href = "recipt.html";
}
