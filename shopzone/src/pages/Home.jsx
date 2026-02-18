import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to ShopZone</h1>
        <p className="hero-subtitle">Your Ultimate Shopping Destination</p>
        <p className="hero-description">
          Discover amazing products at unbeatable prices. Browse through our
          extensive collection and find exactly what you're looking for.
        </p>
        <Link to="/shop" className="cta-button">
          Start Shopping
        </Link>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>🛍️ Wide Selection</h3>
          <p>Browse hundreds of products across various categories</p>
        </div>
        <div className="feature-card">
          <h3>💰 Best Prices</h3>
          <p>Competitive pricing on all our products</p>
        </div>
        <div className="feature-card">
          <h3>🚀 Fast Delivery</h3>
          <p>Quick and reliable shipping to your doorstep</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
