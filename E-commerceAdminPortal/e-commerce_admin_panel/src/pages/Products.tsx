import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Card, Skeleton, Row, Col, Button, message, Modal, Form, Input, InputNumber } from "antd";
import "../styles/Products.css";

const fetchProducts = async () => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) return storedProducts;

    const { data } = await axios.get("https://fakestoreapi.com/products");
    localStorage.setItem("products", JSON.stringify(data));
    return data;
};

const addProduct = async (product) => {
    const { data } = await axios.post("https://fakestoreapi.com/products", product);
    return data;
};

const updateProduct = async ({ id, updatedProduct }) => {
    const { data } = await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct);
    return data;
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, []);

    const addMutation = useMutation({
        mutationFn: addProduct,
        onSuccess: (newProduct) => {
            message.success("Product added successfully!");
            const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
            setProducts(updatedProducts);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            setIsModalOpen(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: ({ id, ...updatedData }) => {
            message.success("Product updated successfully!");
            const updatedProducts = products.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
            setProducts(updatedProducts);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            setIsModalOpen(false);
            setIsEditing(false);
        },
    });

    const deleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        message.success("Product deleted permanently!");
    };

    const openModal = (product = null) => {
        if (product) {
            form.setFieldsValue(product);
            setCurrentProduct(product);
            setIsEditing(true);
        } else {
            form.resetFields();
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleFormSubmit = (values) => {
        if (isEditing) {
            updateMutation.mutate({ id: currentProduct.id, updatedProduct: values });
        } else {
            addMutation.mutate(values);
        }
    };

    return (
        <div className="products-container">
            <h2 className="products-title">Products</h2>

            <div className="add-product-btn">
                <Button onClick={() => openModal()} type="primary">Add Product</Button>
            </div>

            {!products.length ? (
                <Skeleton active />
            ) : (
                <Row gutter={[16, 16]} justify="center">
                    {products.map((product) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <Card
                                className="product-card"
                                hoverable
                                cover={<img alt={product.title} src={product.image} className="product-image" />}
                                actions={[
                                    <Button type="primary" onClick={() => openModal(product)}>Edit</Button>,
                                    <Button type="primary" danger onClick={() => deleteProduct(product.id)}>Delete</Button>
                                ]}
                            >
                                <Card.Meta title={product.title} description={`$${product.price}`} />
                                <p><strong>Category:</strong> {product.category}</p>
                                <p><strong>Rating:</strong> {product.rating?.rate || "N/A"} ⭐ ({product.rating?.count || 0} reviews)</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <Modal title={isEditing ? "Edit Product" : "Add Product"} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter a title" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter a price" }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="category" label="Category">
                        <Input />
                    </Form.Item>
                    <Form.Item name="image" label="Image URL">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>{isEditing ? "Update" : "Add"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Products;
