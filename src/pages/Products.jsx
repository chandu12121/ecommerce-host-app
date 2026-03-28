import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function Products({ isActive = true }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        inventoryStacks: [{ location: 'Main Warehouse', quantity: 0, sku: '' }]
    });

    useEffect(() => {
        if (!isActive) return;
        loadProducts();
    }, [isActive]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to securely fetch catalog.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                brand: product.brand,
                category: product.category,
                description: product.description,
                price: product.price,
                inventoryStacks: product.inventoryStacks?.length ? product.inventoryStacks : [{ location: 'Main Warehouse', quantity: 0, sku: '' }]
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                brand: '',
                category: '',
                description: '',
                price: '',
                inventoryStacks: [{ location: 'Main Warehouse', quantity: 0, sku: '' }]
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, formData);
            } else {
                await productService.createProduct(formData);
            }
            setShowModal(false);
            loadProducts();
        } catch (err) {
            alert('Failed to save product specification.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to permanently purge this item?')) {
            try {
                await productService.deleteProduct(id);
                loadProducts();
            } catch (err) {
                alert('Purge failed.');
            }
        }
    };

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="products">
            <div className="section-header">
                <div>
                    <h2 style={{ marginBottom: "8px" }}>🎁 Product Catalog</h2>
                    <p style={{ color: "var(--text-light)" }}>Manage your entire inventory mapped securely from MongoDB</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button variant="secondary">Import CSV</Button>
                    <Button onClick={() => handleOpenModal()}>+ Add New Product</Button>
                </div>
            </div>

            <div className="filters">
                <Input type="text" placeholder="Search products..." className="search-bar" />
                <select className="input-field" style={{ width: "200px" }}>
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                </select>
                <select className="input-field" style={{ width: "150px" }}>
                    <option>Status: All</option>
                </select>
            </div>

            {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>Loading Catalog...</div>
            ) : error ? (
                <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>⚠️ {error}</div>
            ) : (
                <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th>Inventory</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>No active products.</td></tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '40px', height: '40px', background: 'var(--primary-light)', borderRadius: '6px' }}></div>
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{product.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{product.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{product.inventoryStacks?.[0]?.sku || 'N/A'}</td>
                                        <td>${product.price}</td>
                                        <td>{product.countInStock || 0} in stock</td>
                                        <td>
                                            <span className={`status-badge ${product.onboardStatus === 'approved' ? 'success' : 'pending'}`}>
                                                {product.onboardStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                {product.onboardStatus === 'incomplete' && (
                                                    <Button
                                                        style={{ padding: '4px 8px', fontSize: '0.8rem', background: 'var(--success)' }}
                                                        onClick={async () => {
                                                            try {
                                                                await productService.updateProductStatus(product._id, 'request_for_review', 'Host requested platform review');
                                                                loadProducts();
                                                            } catch (err) {
                                                                alert('Submission failed.');
                                                            }
                                                        }}
                                                    >
                                                        🚀 Submit
                                                    </Button>
                                                )}
                                                <Button variant="secondary" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => handleOpenModal(product)}>Edit</Button>
                                                <Button variant="secondary" style={{ padding: '4px 8px', fontSize: '0.8rem', color: 'var(--error)' }} onClick={() => handleDelete(product._id)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>{editingProduct ? '📝 Edit Inventory Item' : '✨ New Catalog Entry'}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
                            <div className="modal-body">
                                <h4 className="modal-section-title">📦 Basic Specification</h4>
                                <Input label="Full Product Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. MacBook Pro M3 14-inch" required />

                                <div className="grid-2" style={{ gap: '16px', marginTop: '16px' }}>
                                    <Input label="Brand / Manufacturer" name="brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} placeholder="Apple" required />
                                    <Input label="Industry Category" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Electronics" required />
                                </div>

                                <div style={{ marginTop: '16px' }}>
                                    <Input label="Listing Price ($)" type="number" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="1599.00" required />
                                </div>

                                <div className="form-group" style={{ marginTop: '16px' }}>
                                    <label>Extended Description</label>
                                    <textarea className="input-field" rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Provide technical delta and sales copy here..." required></textarea>
                                </div>

                                <h4 className="modal-section-title">🏢 Initial Warehouse Allocation</h4>
                                <div className="grid-3" style={{ fontSize: '0.85rem', gap: '12px' }}>
                                    <Input label="Warehouse" value={formData.inventoryStacks[0].location} onChange={(e) => {
                                        const newStacks = [...formData.inventoryStacks];
                                        newStacks[0].location = e.target.value;
                                        setFormData({ ...formData, inventoryStacks: newStacks });
                                    }} />
                                    <Input label="Units" type="number" value={formData.inventoryStacks[0].quantity} onChange={(e) => {
                                        const newStacks = [...formData.inventoryStacks];
                                        newStacks[0].quantity = parseInt(e.target.value);
                                        setFormData({ ...formData, inventoryStacks: newStacks });
                                    }} />
                                    <Input label="SKU ID" value={formData.inventoryStacks[0].sku} onChange={(e) => {
                                        const newStacks = [...formData.inventoryStacks];
                                        newStacks[0].sku = e.target.value;
                                        setFormData({ ...formData, inventoryStacks: newStacks });
                                    }} />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Discard</Button>
                                <Button type="submit" style={{ minWidth: '160px' }}>
                                    {editingProduct ? 'Commit Changes' : 'Initialize Listing'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
