import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { createProduct, fetchProductById, modifyProduct } from "../api/products";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (productId) {
            loadProductDetails();
        }
    }, [productId]);

    const loadProductDetails = async () => {
        try {
            const data = await fetchProductById(Number(productId));
            form.setFieldsValue(data);
        } catch (error) {
            console.error("Error loading product details:", error);
        }
    };

    const onSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (productId) {
                await modifyProduct(Number(productId), values);
                message.success("Product updated successfully!");
            } else {
                await createProduct(values);
                message.success("Product added successfully!");
            }
            navigate("/products");
        } catch (error) {
            console.error("Error saving product:", error);
            message.error("Operation failed.");
        }
        setLoading(false);
    };

    return (
        <>
            <h2>{productId ? "Update Product" : "Add New Product"}</h2>
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item name="title" label="Product Name" rules={[{ required: true, message: "Please enter product name" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter product price" }]}>
                    <Input type="number" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {productId ? "Update" : "Create"}
                </Button>
            </Form>
        </>
    );
};

export default ProductForm;

