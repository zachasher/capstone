import React from 'react'
import "./nav-bar.scss";


function NavBar() {
  return (
    <div className='navbar'>
        <p className='navbar__logo'>AF Logo</p>
        <div className='navbar__links'>
            <p className='navbar__link'>CLASSES</p>
            <p className='navbar__link'>CONTACT</p>
            <p className='navbar__link'>LOGIN</p>
        </div>
        
    </div>
  )
}

export default NavBar