import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About BookHub</h2>
            <p className='fs-17'>Discover an extensive collection of books for every reader. From thrilling novels to insightful non-fiction, explore a vast range of genres, handpicked just for you. Whether you’re searching for the latest bestseller or a hidden gem, our app provides a seamless browsing experience. Find, read, and enjoy – your next great read is waiting!</p>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
