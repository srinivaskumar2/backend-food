import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
  const [curState, setCurState] = useState('Sign In');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle Sign In or Sign Up logic
    console.log(`${curState} form submitted`);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-popup-inputs">
          {curState === 'Sign Up' && (
            <input type="text" placeholder="Your Name" required />
          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
        </div>

        <button type="submit">{curState}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <span>By continuing, I agree to terms & privacy policy.</span>
        </div>

        <div className="login-popup-toggle">
          {curState === 'Sign In' ? (
            <span onClick={() => setCurState('Sign Up')}>
              Create a new account?
            </span>
          ) : (
            <span onClick={() => setCurState('Sign In')}>
              Already have an account?
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
