import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const adminName = "Admin"; // You can replace this with a dynamic name

    return (
        <div className="dashboard-container">
            {/* Header with Logout & Admin Name */}
            <header className="dashboard-header">
                <span className="admin-name">{adminName}</span>
                <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
            </header>

            <h2 className="dashboard-title">Admin Dashboard</h2>

            {/* Cards for Navigation */}
            <div className="dashboard-grid">
                <div className="dashboard-card" onClick={() => navigate("/products")}>
                    <img src="https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0=" alt="Products" />
                    <p>PRODUCTS</p>
                </div>
                <div className="dashboard-card" onClick={() => navigate("/carts")}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74RjJjJbex_NCiQ96ijiDRBNPUGFVzLu_Aw&s" alt="Carts" />
                    <p>CARTS</p>
                </div>
                <div className="dashboard-card" onClick={() => navigate("/users")}>
                    <img src="https://st2.depositphotos.com/4520249/7106/v/450/depositphotos_71066225-stock-illustration-people.jpg" alt="Users" />
                    <p>USERS</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
