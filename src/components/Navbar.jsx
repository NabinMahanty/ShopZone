import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { selectCartItemsCount } from '../store/slices/cartSlice';
import { selectThemeMode, toggleTheme } from '../store/slices/themeSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, logout } = useAuth();
  const cartCount = useSelector(selectCartItemsCount);
  const themeMode = useSelector(selectThemeMode);

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
          <button
            type="button"
            className="theme-toggle"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            {themeMode === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

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
