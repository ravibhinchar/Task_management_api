import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="form-box">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
                {error && <div style={{ backgroundColor: '#ff444433', border: '1px solid #ff4444', padding: '10px', borderRadius: '5px', marginBottom: '15px', color: '#ff8888' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#333', color: 'white' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#333', color: 'white' }}
                        />
                    </div>
                    <button type="submit" style={{ marginTop: '10px', padding: '12px' }}>Login</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#646cff' }}>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
