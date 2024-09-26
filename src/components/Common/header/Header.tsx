import logo from './../../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { HeaderProps } from '../../BODY/Interfaces'
import { useState } from 'react'
import './Header.css'
import LoginModal from '../../BODY/LoginModal';
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux'
import AdminSubMenu from './AdminsubMenu'
import { getToken } from '../../../utils/localStorage'

const Header:React.FC<HeaderProps> = () => {
  //const navigate = useNavigate(); 
  const [showModal, setShowModal] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const handleOpenModal = () => {
      const token = getToken();
      if (!token) {
        setShowModal(true);
      }else{
        // navigate("/AdmPanel");
        setShowSubMenu(!showSubMenu);
      }
    
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseSubMenu = () => {
    setShowSubMenu(false);
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
            {showSubMenu && <AdminSubMenu onClose={handleCloseSubMenu} />}
          </div>
         {/* </Link> */}
          <div className='cart'>
            <Link to='/cart'>
            <i className='fa fa-shopping-bag icon-circle'></i>
            {/* <span>{cartItems.cartItems.length === 0 ? "" : cartItems.cartItems.length}</span> */}
            <span>{cartItems.length == 0 ? "" : cartItems.length}</span>
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