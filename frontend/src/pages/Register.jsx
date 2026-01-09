import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData.username, formData.email, formData.password);
            // Note: Registration normally defaults to 'user' role via backend logic if not sent, 
            // or we can allow role selection here if backend permits role in body (which it does).
            // For now, simple registration.
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="form-box">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
                {error && <div style={{ backgroundColor: '#ff444433', border: '1px solid #ff4444', padding: '10px', borderRadius: '5px', marginBottom: '15px', color: '#ff8888' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#333', color: 'white' }}
                        />
                    </div>
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
                    <button type="submit" style={{ marginTop: '10px', padding: '12px' }}>Register</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    Already have an account? <Link to="/login" style={{ color: '#646cff' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
