async function fetchProduct() {
    let response = await fetch('https://fakestoreapi.com/products')
    let products = await response.json();
    display(products);
}

function display(products) {
    let productsFetched = document.getElementById("products");

    products.forEach(product => {
        let div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <p><b> ${product.title}<b></p>
            <img src="${product.image}" alt="${product.title}" style="height: 200px; object-fit: contain;" >
            <p><b>Price:</b> $${product.price}</p>
            <div> <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button> </div>
        `;
        productsFetched.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
});

let cartCount = 0;
function addToCart(id, title, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.some(product => product.id === id)) {
        cart.push({ id, title, price, image });
        localStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById("cart-count").textContent = cart.length;
        localStorage.setItem("cartCount", cart.length);
    }
}


fetchProduct();