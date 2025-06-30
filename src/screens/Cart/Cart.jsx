import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';
import { assets } from '../../assets/assets';

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getTotalCartAmount = () => {
    let total = 0;
    for (let itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find(food => food._id === itemId);
        if (itemInfo) {
          total += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return total;
  };

  const getDeliveryFee = () => {
    return getTotalCartAmount() > 0 ? 20 : 0;
  };

  const getFinalTotal = () => {
    return getTotalCartAmount() + getDeliveryFee();
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {Object.values(cartItems).every(quantity => quantity === 0) ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        <>
          <div className="cart-items-title">
            <p>Image</p>
            <p>Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Modify</p>
          </div>
          <hr />
          {food_list.map(item => {
            const quantity = cartItems[item._id] || 0;
            if (quantity === 0) return null;

            return (
              <React.Fragment key={item._id}>
                <div className="cart-items-item">
                  <img src={`https://foodprep-backend-8gxt.onrender.com/uploads/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{quantity}</p>
                  <p>₹{item.price * quantity}</p>
                  <div className="cart-counter">
                    <img
                      src={assets.remove_icon_red}
                      alt="remove"
                      onClick={() => removeFromCart(item._id)}
                    />
                    <span>{quantity}</span>
                    <img
                      src={assets.add_icon_green}
                      alt="add"
                      onClick={() => addToCart(item._id)}
                    />
                  </div>
                </div>
                <hr />
              </React.Fragment>
            );
          })}

          <div className='cart-bottom'>
            <div className='cart-total'>
              <h2>Cart Total</h2>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>₹{getDeliveryFee()}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Total</p>
                <p>₹{getFinalTotal()}</p>
              </div>
              <button className="checkout-btn" onClick={() => navigate("/order")}>
                Proceed to Checkout
              </button>
            </div>

            <div className='cart-promocode'>
              <p>If you have a promo code, enter it here:</p>
              <div className='promo-input'>
                <input type='text' placeholder='Enter promo code' />
                <button>Apply</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
