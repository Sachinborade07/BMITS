interface rating {
    rate: number;
    count: number;
}

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: rating;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    updateCartCount();
});

async function fetchProducts(): Promise<void> {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products: Product[] = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products: Product[]): void {
    const productsContainer = document.getElementById("products");
    if (!productsContainer) return;

    products.forEach((product: Product) => {
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

function updateCartCount(): void {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.length.toString();
    }
}

function addToCart(id: number, title: string, price: number, image: string): void {
    let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.some(product => product.id === id)) {
        cart.push({ id, title, price, image });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }
}
