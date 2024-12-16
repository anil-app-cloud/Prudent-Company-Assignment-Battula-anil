import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import './index.css';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import AddBook from '../BookManagement/add';
import { useGlobalContext } from '../../context';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isAddButtonClicked, toggleAddBook } = useGlobalContext();

  const handleNavbar = () => setToggleMenu(!toggleMenu);

  const closeMenu = () => setToggleMenu(false);

  const addBookClicked = () => {
    toggleAddBook(!isAddButtonClicked);
  };

  return (
    <nav className='navbar' id='navbar'>
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link to='/' className='navbar-brand flex'>
            <div>
              <FaBook size={30} color='green' />
            </div>
            <span className='text-uppercase fw-7 fs-24 ls-1'>Anilbookstore</span>
          </Link>
          <button type='button' className='navbar-toggler-btn' onClick={handleNavbar}>
            <HiOutlineMenuAlt3
              size={35}
              style={{
                color: `${toggleMenu ? '#fff' : '#010101'}`,
              }}
            />
          </button>
        </div>

        <div className={toggleMenu ? 'navbar-collapse show-navbar-collapse' : 'navbar-collapse'}>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link to='/book' className='nav-link text-uppercase text-light-black fs-22 fw-6 ls-1' onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-link text-uppercase text-light-black fs-22 fw-6 ls-1' onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/contact' className='nav-link text-uppercase text-light-black fs-22 fw-6 ls-1' onClick={closeMenu}>
                Contact
              </Link>
            </li>
            <li className='nav-item'>
              <button type='button' className='add-book-btn' onClick={addBookClicked}>
                Add Book
              </button>
            </li>
          </ul>
        </div>
        {isAddButtonClicked && <AddBook />}
      </div>
    </nav>
  );
};

export default Navbar;
