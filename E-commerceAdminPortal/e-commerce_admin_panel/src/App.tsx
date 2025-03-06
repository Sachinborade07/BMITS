import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginFormZ from "./components/LoginForm";
import AdminDashboard from "./pages/AdminDashborad";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginFormZ />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
