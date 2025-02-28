export const fetchAllProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
};

export const fetchProductById = async (productId: number) => {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    return res.json();
};

export const createProduct = async (productData: any) => {
    const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    });
    return res.json();
};

export const modifyProduct = async (productId: number, productData: any) => {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    });
    return res.json();
};

export const removeProduct = async (productId: number) => {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "DELETE",
    });
    return res.json();
};

