import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const cartCount = getCartItemsCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ ShopZone
        </Link>

        <ul className="navbar-menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="navbar-actions">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `cart-icon ${isActive ? 'active' : ''}`
            }
          >
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>

          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">👤 {user?.username}</span>
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
