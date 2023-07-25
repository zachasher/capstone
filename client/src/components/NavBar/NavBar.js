import React from 'react'
import "./nav-bar.scss";
import { useEffect, useState } from 'react';


function NavBar() {
  const [navbarClass, setNavbarClass] = useState('navbar navbar-transparent');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // Update the class name based on the scroll position
    if (scrollPosition > 100) {
      setNavbarClass('navbar navbar-solid');
    } else {
      setNavbarClass('navbar navbar-transparent');
    }
  };

  return (
    <div className={navbarClass}>
        <p className='navbar__logo'>AF</p>
        <div className='navbar__links'>
            <p className='navbar__link'>CLASSES</p>
            <p className='navbar__link'>CONTACT</p>
            <p className='navbar__link'>LOGIN</p>
        </div>
        
    </div>
  )
}

export default NavBar