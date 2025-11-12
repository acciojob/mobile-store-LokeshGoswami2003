import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { loadProducts, saveProducts } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = new URLSearchParams(location.search).get("admin") === "true";

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });

  useEffect(() => {
    const products = loadProducts();
    const p = products.find((x) => String(x.id) === String(id));
    if (p) {
      setProduct(p);
      setForm({ name: p.name, description: p.description, price: p.price, image: p.image });
    }
  }, [id]);

  if (!product) return <div className="container">Product not found</div>;

  function onBack() {
    navigate("/");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSave() {
    const products = loadProducts();
    const idx = products.findIndex((x) => String(x.id) === String(id));
    if (idx !== -1) {
      products[idx] = { ...products[idx], name: form.name, description: form.description, price: Number(form.price), image: form.image };
      saveProducts(products);
      setProduct(products[idx]);
    }
  }

  return (
    <div className="container">
      <button className="btn" onClick={onBack} style={{ marginBottom: 12 }}>
        Back
      </button>

      <div className="detail">
        <img src={product.image} alt={product.name} />
        {!isAdmin && (
          <>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </>
        )}

        {isAdmin && (
          <div className="admin-edit">
            <div>
              <label>
                Name
                <input className="form-control" name="name" value={form.name} onChange={handleChange} />
              </label>
              <label>
                Description
                <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
              </label>
              <label>
                Image URL
                <input className="form-control" name="image" value={form.image} onChange={handleChange} />
              </label>
              <label>
                Price
                <input className="form-control" name="price" value={form.price} onChange={handleChange} />
              </label>
            </div>

            <div />

            <div>
              <button data-testid="save-btn" className="save-btn" onClick={handleSave} style={{ marginTop: 8 }}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
