import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Skeleton, Row, Col, Button, message, Image, Typography } from "antd";
import "../styles/Cart.css";

const { Title, Text } = Typography;

const fetchCartItems = async () => {
    try {
        const { data } = await axios.get("https://fakestoreapi.com/carts");
        return data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return [];
    }
};

const fetchProductDetails = async (productId) => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        return data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
};

const deleteCart = async (cartId) => {
    try {
        await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
            method: "DELETE",
        });
        message.success(`Cart ${cartId} deleted successfully!`);
        return true;
    } catch (error) {
        console.error("Error deleting cart:", error);
        message.error("Failed to delete cart.");
        return false;
    }
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            const cartData = await fetchCartItems();

            const cartWithDetails = await Promise.all(
                cartData.map(async (cart) => ({
                    ...cart,
                    products: await Promise.all(
                        cart.products.map(async (p) => {
                            const productDetails = await fetchProductDetails(p.productId);
                            return { ...p, details: productDetails };
                        })
                    ),
                }))
            );

            setCartItems(cartWithDetails);
            setLoading(false);
        };

        loadCart();
    }, []);

    const handleDeleteCart = async (cartId) => {
        const success = await deleteCart(cartId);
        if (success) {
            setCartItems(cartItems.filter((cart) => cart.id !== cartId));
        }
    };

    return (
        <div className="cart-container">
            <Title level={2} className="cart-title">Your Cart</Title>

            {loading ? (
                <Skeleton active />
            ) : cartItems.length === 0 ? (
                <Title level={4} className="cart-empty">Your cart is empty</Title>
            ) : (
                <Row gutter={[24, 24]} justify="center">
                    {cartItems.map((cart) => (
                        <Col xs={24} key={cart.id}>
                            <Card
                                title={`User ID: ${cart.userId}`}
                                extra={<Button type="primary" danger onClick={() => handleDeleteCart(cart.id)}>Delete Cart</Button>}
                                className="cart-card"
                            >
                                <Row gutter={[16, 16]}>
                                    {cart.products.map((product) => (
                                        <Col xs={24} sm={12} md={8} lg={6} key={product.productId}>
                                            <Title level={5}>{product.details?.title}</Title>
                                            <Card
                                                hoverable
                                                cover={<Image src={product.details?.image} alt={product.details?.title} width="100%" height={200} />}
                                                className="product-card"
                                            >

                                                <Text strong>Price: </Text><Text>${product.details?.price}</Text><br />
                                                <Text strong>Category: </Text><Text>{product.details?.category}</Text><br />
                                                <Text strong>Quantity: </Text><Text>{product.quantity}</Text>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default Cart;
