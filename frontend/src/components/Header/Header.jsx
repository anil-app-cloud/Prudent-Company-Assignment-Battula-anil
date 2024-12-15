import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>Welcome to Your Ultimate Bookstore Experience!</h2><br />
                <h3 className='header-text fs-18 fw-3 small-header'>"Discover Your Next Great Read!</h3>
                <p className='header-text fs-18 fw-3'>Explore a world of stories, knowledge, and adventure in our bookstore app. From timeless classics to the latest bestsellers, find the books that inspire, entertain, and enlighten. Your perfect book is just a tap away!"</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header