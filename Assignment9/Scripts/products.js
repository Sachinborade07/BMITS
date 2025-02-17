var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    updateCartCount();
});
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://fakestoreapi.com/products');
            const products = yield response.json();
            displayProducts(products);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
}
function displayProducts(products) {
    const productsContainer = document.getElementById("products");
    if (!productsContainer)
        return;
    products.forEach((product) => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <p><b>${product.title}</b></p>
            <img src="${product.image}" alt="${product.title}" style="height: 200px; object-fit: contain;" >
            <p><b>Price:</b> $${product.price}</p>
            <div> <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button> </div>
        `;
        productsContainer.appendChild(div);
    });
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.length.toString();
    }
}
function addToCart(id, title, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.some(product => product.id === id)) {
        cart.push({ id, title, price, image });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }
}
