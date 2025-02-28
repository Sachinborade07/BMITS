export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
}