import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetails from "./pages/ProductDetails";
import { Layout } from "antd";

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit/:productId" element={<ProductForm />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
