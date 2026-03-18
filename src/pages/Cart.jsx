import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../store/slices/cartSlice';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <Link to="/shop" className="shop-now-button">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button onClick={() => dispatch(clearCart())} className="clear-cart-button">
          Clear Cart
        </button>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="item-image">
                <img src={item.thumbnail} alt={item.title} />
              </Link>

              <div className="item-details">
                <Link to={`/product/${item.id}`} className="item-title">
                  <h3>{item.title}</h3>
                </Link>
                <p className="item-category">{item.category}</p>
                <p className="item-price">${item.price}</p>
              </div>

              <div className="item-quantity">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.id,
                        quantity: item.quantity - 1,
                      }),
                    )
                  }
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.id,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                  className="quantity-button"
                >
                  +
                </button>
              </div>

              <div className="item-total">
                <p className="total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-row">
            <span>Tax (estimated)</span>
            <span>${(cartTotal * 0.1).toFixed(2)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total</span>
            <span>${(cartTotal * 1.1).toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

          <Link to="/shop" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
