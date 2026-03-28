import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function Inventory({ isActive = true }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [inventoryStacks, setInventoryStacks] = useState([]);

    useEffect(() => {
        if (!isActive) return;
        loadInventory();
    }, [isActive]);

    const loadInventory = async () => {
        try {
            setLoading(true);
            const data = await productService.getProducts();
            setProducts(data);
        } catch (err) {
            console.error('Failed to load metrics:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setInventoryStacks(product.inventoryStacks?.length ? JSON.parse(JSON.stringify(product.inventoryStacks)) : [{ location: 'Main Warehouse', quantity: 0, sku: '' }]);
        setShowModal(true);
    };

    const handleUpdateStack = async (e) => {
        e.preventDefault();
        try {
            await productService.updateProduct(selectedProduct._id, { inventoryStacks });
            setShowModal(false);
            loadInventory();
        } catch (err) {
            alert('Failed to update warehouse stacks.');
        }
    };

    const updateStackField = (index, field, value) => {
        const newStacks = [...inventoryStacks];
        newStacks[index][field] = field === 'quantity' ? parseInt(value) || 0 : value;
        setInventoryStacks(newStacks);
    };

    const addStack = () => {
        setInventoryStacks([...inventoryStacks, { location: '', quantity: 0, sku: '' }]);
    };

    const removeStack = (index) => {
        if (inventoryStacks.length === 1) return;
        const newStacks = inventoryStacks.filter((_, i) => i !== index);
        setInventoryStacks(newStacks);
    };

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="inventory">
            <div className="section-header">
                <div>
                    <h2 style={{ marginBottom: "8px" }}>📈 Inventory Management</h2>
                    <p style={{ color: "var(--text-light)" }}>Control warehouse stacks and monitor real-time stock limits.</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button variant="secondary" onClick={loadInventory}>Sync Warehouse</Button>
                </div>
            </div>

            <div className="filters">
                <Input type="text" placeholder="Search SKU or Brand..." className="search-bar" />
                <select className="input-field" style={{ width: "200px" }}>
                    <option>All Inventory Stacks</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                </select>
            </div>

            <div className="card" style={{ padding: "0" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product Detail</th>
                            <th>Master SKU</th>
                            <th>Total Units (Warehouse)</th>
                            <th>Reserved Limits</th>
                            <th>Status Badge</th>
                            <th>Adjustment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>Loading Warehouse Limits...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "var(--text-light)" }}>Warehouse empty.</td></tr>
                        ) : (
                            products.map((product) => {
                                const totalQty = product.countInStock || 0;
                                const isLowStock = totalQty < 10 && totalQty > 0;
                                const isOutOfStock = totalQty === 0;

                                return (
                                    <tr key={product._id}>
                                        <td style={{ fontWeight: 600 }}>{product.name}</td>
                                        <td>{product.inventoryStacks?.[0]?.sku || 'N/A'}</td>
                                        <td style={{ fontWeight: 600 }}>{totalQty} Units</td>
                                        <td style={{ color: "var(--text-light)" }}>{Math.floor(totalQty * 0.1)} Pipeline hold</td>
                                        <td>
                                            <span className={`status-badge ${isOutOfStock ? 'error' : isLowStock ? 'warning' : 'success'}`}>
                                                {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock Warning' : 'Healthy Allocation'}
                                            </span>
                                        </td>
                                        <td>
                                            <Button variant="secondary" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => handleOpenModal(product)}>Modify Stack</Button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>📦 Adjust Stock: {selectedProduct.name}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleUpdateStack} style={{ display: 'contents' }}>
                            <div className="modal-body">
                                <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '0.9rem' }}>
                                    Manage individual warehouse allocations. Real-time updates will affect global in-stock status.
                                </p>

                                {inventoryStacks.map((stack, index) => (
                                    <div key={index} style={{ marginBottom: '24px', padding: '16px', borderRadius: '12px', background: 'var(--bg)', border: '1px solid var(--border)', position: 'relative' }}>
                                        {inventoryStacks.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeStack(index)}
                                                style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '1.2rem' }}
                                            >&times;</button>
                                        )}
                                        <div className="grid-3" style={{ gap: '12px' }}>
                                            <Input label="Warehouse Location" value={stack.location} onChange={(e) => updateStackField(index, 'location', e.target.value)} required />
                                            <Input label="Quantity" type="number" value={stack.quantity} onChange={(e) => updateStackField(index, 'quantity', e.target.value)} required />
                                            <Input label="SKU / Bin ID" value={stack.sku} onChange={(e) => updateStackField(index, 'sku', e.target.value)} required />
                                        </div>
                                    </div>
                                ))}

                                <Button type="button" variant="secondary" style={{ width: '100%', borderStyle: 'dashed', borderWeight: '2px' }} onClick={addStack}>
                                    + Add New Allocation Location
                                </Button>
                            </div>

                            <div className="modal-footer">
                                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button type="submit" style={{ minWidth: '180px' }}>Apply Warehouse Sync</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
