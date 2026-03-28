import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import Button from '../components/common/Button';

export default function Reviews({ isActive = true }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isActive) return;
        const load = async () => {
            try {
                const data = await productService.getProducts();
                setProducts(data);
            } catch (err) {
                console.error('Failed to load product reviews:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [isActive]);

    // Flatten all reviews from all host products
    const allReviews = products.flatMap(p =>
        (p.reviews || []).map(r => ({ ...r, productName: p.name }))
    );

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="reviews">
            <h2 style={{ marginBottom: "16px" }}>⭐ Customer Reviews ({allReviews.length} Total)</h2>

            <div className="panel">
                <div className="panel-header">
                    <div className="panel-title">Recent Reviews</div>
                </div>
                <div className="panel-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Customer</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading reviews from MongoDB...</td></tr>
                            ) : allReviews.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                                        <strong>No reviews yet.</strong><br />
                                        When customers rate your products, their reviews will appear here.
                                    </td>
                                </tr>
                            ) : (
                                allReviews.map((r, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{r.productName}</td>
                                        <td>{r.name}</td>
                                        <td>{'⭐'.repeat(r.rating)}</td>
                                        <td>{r.comment}</td>
                                        <td style={{ color: 'var(--text-light)' }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
