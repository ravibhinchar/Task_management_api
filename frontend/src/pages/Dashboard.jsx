import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', newProduct);
            setNewProduct({ name: '', description: '', price: '' });
            fetchProducts();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to delete product');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1>Dashboard</h1>
                    <div>
                        <span style={{ backgroundColor: '#333', padding: '5px 10px', borderRadius: '5px' }}>
                            {user && user.role.toUpperCase()}
                        </span>
                    </div>
                </div>

                <p style={{ marginBottom: '30px', color: '#888' }}>Welcome back, {user && user.username}</p>

                <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                    <h3 style={{ marginTop: 0 }}>Add New Product</h3>
                    {error && <p style={{ color: '#ff8888' }}>{error}</p>}
                    <form onSubmit={handleAddProduct} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 2fr 1fr auto' }}>
                        <input
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: 'white' }}
                        />
                        <input
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            required
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: 'white' }}
                        />
                        <input
                            type="number"
                            placeholder="Price ($)"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: 'white' }}
                        />
                        <button type="submit" style={{ whiteSpace: 'nowrap' }}>+ Add Product</button>
                    </form>
                </div>

                <div>
                    <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>Inventory</h3>
                    {products.length === 0 ? <p style={{ color: '#888', fontStyle: 'italic', marginTop: '20px' }}>No products found. Add one above!</p> : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {products.map(p => (
                                <li key={p._id} style={{
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    marginBottom: '10px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'transform 0.2s'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{p.name} <span style={{ color: '#4caf50', marginLeft: '10px' }}>${p.price}</span></div>
                                        <div style={{ color: '#aaa', margin: '5px 0' }}>{p.description}</div>
                                        <div style={{ fontSize: '0.8em', color: '#666' }}>Owner: <span style={{ color: '#888' }}>{p.user?.username || 'Unknown'}</span></div>
                                    </div>
                                    {(user && (user.role === 'admin' || user.id === p.user._id || user.id === p.user)) && (
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '8px 15px' }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
