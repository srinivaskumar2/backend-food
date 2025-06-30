import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Cart from './screens/Cart/Cart';
import Home from './screens/Home/Home';
import PlaceOrder from './screens/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>

      <Footer />

      {/* ✅ ToastContainer added globally */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default App;
