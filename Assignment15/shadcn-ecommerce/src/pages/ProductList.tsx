import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { fetchAllProducts, removeProduct } from "../api/products";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        retrieveProducts();
    }, []);

    const retrieveProducts = async () => {
        try {
            const data = await fetchAllProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error retrieving products:", error);
        }
    };

    const handleEditProduct = (productId: number) => {
        navigate(`/products/edit/${productId}`);
    };

    const handleDeleteProduct = (productId: number) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "Deleting this product cannot be undone.",
            okText: "Confirm",
            cancelText: "Cancel",
            okType: "danger",
            onOk: async () => {
                try {
                    await removeProduct(productId);
                    message.success("Product deleted successfully!");
                    retrieveProducts();
                } catch (error) {
                    console.error("Error removing product:", error);
                    message.error("Failed to delete product.");
                }
            },
        });
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "title", key: "title" },
        { title: "Price", dataIndex: "price", key: "price" },
        {
            title: "Actions",
            key: "actions",
            render: (product: any) => (
                <>
                    <Button onClick={() => handleEditProduct(product.id)}>Modify</Button>
                    <Button danger onClick={() => handleDeleteProduct(product.id)}>Erase</Button>
                </>
            ),
        },
    ];

    return (
        <>
            <h2>Available Products</h2>
            <Button type="primary" onClick={() => navigate("/products/new")}>
                Create New Product
            </Button>
            <Table columns={columns} dataSource={products} rowKey="id" />
        </>
    );
};

export default ProductList;

