import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <nav style={{ background: '#333', color: '#fff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>PrimeTrade AI</h2>
            <div>
                <button onClick={logout} style={{ padding: '5px 15px' }}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
