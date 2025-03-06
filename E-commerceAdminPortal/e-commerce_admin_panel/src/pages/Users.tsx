import { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Skeleton, Button, Form, Input, Modal, message } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

// API URL
const API_URL = "https://fakestoreapi.com/users";

// Fetch all users
const fetchUsers = async () => {
    try {
        const { data } = await axios.get(API_URL);
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const loadUsers = async () => {
            const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
            if (storedUsers.length > 0) {
                setUsers(storedUsers);
                setLoading(false);
            } else {
                const usersData = await fetchUsers();
                setUsers(usersData);
                localStorage.setItem("users", JSON.stringify(usersData));
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // Add new user
    const addUser = async (values) => {
        try {
            const newUser = {
                id: users.length + 1,
                name: { firstname: values.firstname, lastname: values.lastname },
                email: values.email,
                username: values.username,
                phone: values.phone,
                address: { street: values.street, city: values.city },
            };

            const { data } = await axios.post(API_URL, newUser);
            const updatedUsers = [...users, data];
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            message.success("User added successfully!");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding user:", error);
            message.error("Failed to add user.");
        }
    };

    // Update user
    const updateUser = async (values) => {
        try {
            const updatedUser = {
                id: editingUser.id,
                name: { firstname: values.firstname, lastname: values.lastname },
                email: values.email,
                username: values.username,
                phone: values.phone,
                address: { street: values.street, city: values.city },
            };

            await axios.put(`${API_URL}/${editingUser.id}`, updatedUser);
            const updatedUsers = users.map(user => user.id === editingUser.id ? updatedUser : user);
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            message.success("User updated successfully!");
            setIsModalOpen(false);
            setEditingUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
            message.error("Failed to update user.");
        }
    };

    // Delete user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            message.success("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            message.error("Failed to delete user.");
        }
    };

    // Open modal for adding/updating user
    const openModal = (user = null) => {
        setEditingUser(user);
        setIsModalOpen(true);
        if (user) {
            form.setFieldsValue({
                firstname: user.name.firstname,
                lastname: user.name.lastname,
                email: user.email,
                username: user.username,
                phone: user.phone,
                street: user.address.street,
                city: user.address.city,
            });
        } else {
            form.resetFields();
        }
    };

    return (
        <div style={{ padding: "30px", backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>Users</Title>
            <Button type="primary" onClick={() => openModal()} style={{ marginBottom: "20px" }}>
                Add User
            </Button>

            {loading ? (
                <Skeleton active />
            ) : (
                <Row gutter={[24, 24]} justify="center">
                    {users.map((user) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
                            <Card
                                title={`${user.name.firstname} ${user.name.lastname}`}
                                extra={
                                    <div>
                                        <Button type="link" onClick={() => openModal(user)}>Edit</Button>
                                        <Button type="link" danger onClick={() => deleteUser(user.id)}>Delete</Button>
                                    </div>
                                }
                            >
                                <Text strong>Email:</Text> <Text>{user.email}</Text><br />
                                <Text strong>Username:</Text> <Text>{user.username}</Text><br />
                                <Text strong>Phone:</Text> <Text>{user.phone}</Text><br />
                                <Text strong>Address:</Text> <Text>{user.address.street}, {user.address.city}</Text><br />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Add/Edit User Modal */}
            <Modal
                title={editingUser ? "Edit User" : "Add User"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={editingUser ? updateUser : addUser}
                >
                    <Form.Item name="firstname" label="First Name" rules={[{ required: true, message: "Please enter first name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label="Last Name" rules={[{ required: true, message: "Please enter last name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter email" }]}>
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please enter username" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please enter phone number" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="street" label="Street" rules={[{ required: true, message: "Please enter street" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="city" label="City" rules={[{ required: true, message: "Please enter city" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingUser ? "Update User" : "Add User"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;
