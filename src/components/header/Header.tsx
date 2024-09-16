import logo from './../../assets/logo.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { HeaderProps } from '../BODY/Interfaces'
import { useState } from 'react'

import './Header.css'
import LoginModal from '../BODY/LoginModal';
import { useAuth } from '../../auth/AuthProv'
import App from '../../App'

const Header: React.FC<HeaderProps> = (cartItems) => {
  const [showModal, setShowModal] = useState(false);
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return App();
  }
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <div className='left row'>
            <i className='fa fa-phone'></i>
            <label> +930567876</label>
            <i className='fa fa-envelope'></i>
            <label> suppot_melendez@gmail.com</label>
          </div>
          <div className='right row RText'>
            <label>Help?</label>
            <span>🏳️‍⚧️</span>
            <label>EN</label>
            <span>🏳️‍⚧️</span>
            <label>USD</label>
          </div>
        </div>
      </section>
      <section className='search'>
        <div className='container c_flex'>
          <Link to='/'>
            <div className='logo width '>
              <img src={logo} alt='' />
            </div>
          </Link>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>
          {/* <Link to='/login'> */}
          <div className='icon f_flex width' onClick={handleOpenModal}>
            <i className='fa fa-user icon-circle'></i>
          </div>
          {/* </Link> */}
          <div className='cart'>
            <Link to='/cart'>
              <i className='fa fa-shopping-bag icon-circle'></i>
              <span>{cartItems.cartItems.length === 0 ? "" : cartItems.cartItems.length}</span>
            </Link>
          </div>
        </div>
      </section >
      <section className='header'>
        <div className='container d_flex'>
          <div className='catgrories d_flex'>
            <span className='fa-solid fa-border-all'></span>
            <h4>
              Categories <i className='fa fa-chevron-down'></i>
            </h4>
          </div>
        </div>
      </section>
      <LoginModal open={showModal} onClose={handleCloseModal} />
    </>
  )
}

export default Header