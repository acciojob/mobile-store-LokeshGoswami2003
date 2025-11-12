
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./../styles/App.css";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import AdminPanel from "./AdminPanel";
import { loadProducts } from "../data/products";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  return (
    <div>
      {/* Do not remove the main div */}
      <Router>
        <nav>
          <ul style={{ display: "flex", listStyle: "none", gap: 12 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
