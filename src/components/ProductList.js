import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadProducts } from "../data/products";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="products">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <Link to={`/products/${p.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
