import React, { useContext } from 'react';
import './FoodCard.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const FoodCard = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img
          src={`${API_BASE_URL}/uploads/${image}`}
          alt={name}
          className="food-item-image"
        />
        {
          !cartItems[id] ? (
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              className="add"
              alt="add"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="remove"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="add"
              />
            </div>
          )
        }
      </div>
      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price-rating">
          <p className="food-item-price">₹{price}</p>
          <img src={assets.rating_stars} alt="rating" />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
