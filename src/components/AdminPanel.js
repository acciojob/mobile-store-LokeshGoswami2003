import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadProducts, saveProducts } from "../data/products";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleAdd() {
    const current = loadProducts();
    const nextId = current.reduce((m, p) => Math.max(m, p.id), 0) + 1;
    const newProduct = { id: nextId, name: form.name || "New Phone", description: form.description || "", price: Number(form.price) || 0, image: form.image || "https://via.placeholder.com/150?text=New" };
    const next = [...current, newProduct];
    saveProducts(next);
    setProducts(next);
    setForm({ name: "", description: "", price: "", image: "" });
  }

  function handleDelete(id) {
    const current = loadProducts();
    const next = current.filter((p) => p.id !== id);
    saveProducts(next);
    setProducts(next);
  }

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <div className="admin-add">
        <input className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input className="form-control" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input className="form-control" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="admin-list">
        <h3>Total products: {products.length}</h3>
        {products.map((p, idx) => (
          <div className="admin-row" key={p.id} style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
            <img src={p.image} alt={p.name} style={{ width: 60, height: 60, objectFit: "cover" }} />
            <div style={{ display: "inline-block", marginLeft: 12 }}>
              <Link to={`/products/${p.id}?admin=true`}>{p.name}</Link>
              <div>${p.price}</div>
            </div>

            <button className="float-right" onClick={() => handleDelete(p.id)} style={{ float: "right", marginLeft: 8 }}>
              Delete
            </button>
            <Link className="float-right" to={`/products/${p.id}?admin=true`} style={{ float: "right", marginRight: 8 }}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
