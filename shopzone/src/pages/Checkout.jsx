import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Simulate order placement
    alert('Order placed successfully! 🎉\n\nThank you for shopping with ShopZone!');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>No items in cart</h2>
        <p>Add some products before checking out</p>
        <button onClick={() => navigate('/shop')} className="shop-button">
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-form">
          <form onSubmit={handlePlaceOrder}>
            <section className="form-section">
              <h2>Customer Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={user?.username || ''}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input type="text" id="lastName" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" required />
              </div>
            </section>

            <section className="form-section">
              <h2>Shipping Address</h2>
              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input type="text" id="address" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input type="text" id="city" required />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input type="text" id="state" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zip">ZIP Code *</label>
                  <input type="text" id="zip" required />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <input type="text" id="country" defaultValue="USA" required />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Information</h2>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Expiry Date *</label>
                  <input type="text" id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input type="text" id="cvv" placeholder="123" required />
                </div>
              </div>
            </section>

            <button type="submit" className="place-order-button">
              Place Order - ${(getCartTotal() * 1.1).toFixed(2)}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
