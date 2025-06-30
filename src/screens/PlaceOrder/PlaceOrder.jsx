import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount } = useContext(StoreContext);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone: ""
  });

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const deliveryFee = getTotalCartAmount() > 0 ? 20 : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          _id: item._id,
          name: item.name,
          quantity: cartItems[item._id]
        });
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/order/place`, orderData);
      if (response.data.success) {
        toast("Order placed successfully!");
        navigate("/"); 
      } else {
        toast("Failed to place order.");
      }
    } catch (err) {
      console.log("Error placing order:", err);
      toast("Server error while placing order.");
    }
  };

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input name="first_name" type="text" placeholder='First Name' onChange={onChangeHandler} required />
          <input name="last_name" type="text" placeholder='Last Name' onChange={onChangeHandler} required />
        </div>
        <input name="email" type='email' placeholder='Email address' onChange={onChangeHandler} required />
        <input name="street" type='text' placeholder='Street' onChange={onChangeHandler} required />
        <div className="multi-fields">
          <input name="city" type="text" placeholder='City' onChange={onChangeHandler} required />
          <input name="state" type="text" placeholder='State' onChange={onChangeHandler} required />
        </div>
        <div className="multi-fields">
          <input name="zip_code" type="text" placeholder='Zip code' onChange={onChangeHandler} required />
          <input name="country" type="text" placeholder='Country' onChange={onChangeHandler} required />
        </div>
        <input name="phone" type='text' placeholder='Phone' onChange={onChangeHandler} required />
      </div>

      <div className="place-order-right">
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <p>Total</p>
            <p>₹{getTotalCartAmount() + deliveryFee}</p>
          </div>
          <button type="submit" className="checkout-btn">
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
