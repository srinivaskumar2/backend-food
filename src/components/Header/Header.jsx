import React from 'react'
import './Header.css' // ✅ Use relative path

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Delicious food, just a click away</h2>
        <p>Discover the joy of eating without the hassle of cooking. With just a few clicks, you can explore a variety of delicious meals, from comfort classics to exotic dishes—all delivered straight to your door.</p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header
