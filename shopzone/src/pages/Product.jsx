import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      setProduct(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>{error || 'The product you are looking for does not exist.'}</p>
        <button onClick={() => navigate('/shop')} className="back-button">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-page">
      {showNotification && (
        <div className="notification">Added to cart successfully! 🎉</div>
      )}
      
      <button onClick={() => navigate('/shop')} className="back-link">
        ← Back to Shop
      </button>

      <div className="product-container">
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.title}
            />
          </div>
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <div className="product-header">
            <h1>{product.title}</h1>
            <span className="product-brand">{product.brand}</span>
          </div>

          <div className="product-rating-section">
            <span className="rating">⭐ {product.rating.toFixed(1)}</span>
            <span className="stock-info">
              {product.stock > 0 ? (
                <span className="in-stock">In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </span>
          </div>

          <div className="product-price-section">
            <div className="current-price">${product.price}</div>
            {product.discountPercentage > 0 && (
              <>
                <div className="original-price">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </div>
                <div className="discount-badge">
                  Save {product.discountPercentage.toFixed(0)}%
                </div>
              </>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <strong>Category:</strong> <span>{product.category}</span>
            </div>
            <div className="meta-item">
              <strong>SKU:</strong> <span>{product.sku}</span>
            </div>
            <div className="meta-item">
              <strong>Return Policy:</strong> <span>{product.returnPolicy}</span>
            </div>
            <div className="meta-item">
              <strong>Warranty:</strong> <span>{product.warrantyInformation}</span>
            </div>
            <div className="meta-item">
              <strong>Shipping:</strong> <span>{product.shippingInformation}</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="add-to-cart-button"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-list">
            {product.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <strong>{review.reviewerName}</strong>
                  <span className="review-rating">⭐ {review.rating}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
