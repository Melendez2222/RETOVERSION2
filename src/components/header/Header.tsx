import logo from './../../assets/logo.svg'
// import { useState } from 'react'
import './Header.css'

const Header = () => {
  // const [MobileMenu, setMobileMenu] = useState(false)
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
          <div className='logo width '>
            <img src={logo} alt='' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>
          <div className='icon f_flex width'>
            {/* <Link to='/LoginModal'> */}
            <i className='fa fa-user icon-circle'></i>
            {/* </Link> */}
          </div>
          <div className='cart'>
            {/* <Link to='/cart'> */}
            <i className='fa fa-shopping-bag icon-circle'></i>
            {/* <span>{CartItem.length === 0 ? "" : CartItem.length}</span> */}
            {/* </Link> */}
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
    </>
  )
}

export default Header