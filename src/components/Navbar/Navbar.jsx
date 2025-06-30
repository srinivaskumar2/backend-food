import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';

const Navbar = ({ showLogin, setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount } = useContext(StoreContext); // ✅ Correct destructuring

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setMenu('home')}>
        <img className="logo" src={assets.logo} alt="logo" />
      </Link>

      <ul className="navbar-menu">
        <li className={menu === 'home' ? 'active' : ''}>
          <Link to="/" onClick={() => setMenu('home')}>Home</Link>
        </li>
        <li className={menu === 'menu' ? 'active' : ''}>
          <a href="#explore-menu" onClick={() => setMenu('menu')}>Menu</a>
        </li>
        <li className={menu === 'contact-us' ? 'active' : ''}>
          <a href="#footer" onClick={() => setMenu('contact-us')}>Contact Us</a>
        </li>
      </ul>

      <div className="navbar-right">
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
