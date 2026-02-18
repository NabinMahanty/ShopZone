import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state, default to home
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // If already authenticated, redirect
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = (e) => {
    e.preventDefault();
    const name = username.trim() || 'Guest';
    login(name);
    // Navigate to the page they were trying to access or home
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome to ShopZone</h1>
          <p>Login to access protected features</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username (Optional)</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name or leave blank for Guest"
              className="username-input"
            />
          </div>

          <button type="submit" className="login-button">
            Login as {username.trim() || 'Guest'}
          </button>
        </form>

        <div className="login-info">
          <p>
            This is a demo application with simulated authentication. Simply
            click the login button to continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
