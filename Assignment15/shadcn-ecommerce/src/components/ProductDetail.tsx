import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { fetchProductById } from "../api/products";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadProductInfo();
    }, []);

    const loadProductInfo = async () => {
        try {
            const data = await fetchProductById(Number(productId));
            setProduct(data);
        } catch (error) {
            console.error("Error loading product:", error);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <>
            <Card title={product.title} style={{ width: 400 }}>
                <p><strong>Price:</strong> ${product.price}</p>
                <Button onClick={() => navigate("/products")}>Back to Products</Button>
            </Card>
        </>
    );
};

export default ProductDetails;