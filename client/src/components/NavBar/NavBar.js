import React from 'react'
import "./nav-bar.scss";


function NavBar() {
  return (
    <div className='navbar'>
        <p className='navbar__logo'>AF Logo</p>
        <div className='navbar__links'>
            <p>CLASSES</p>
            <p>CONTACT</p>
            <p>LOGIN</p>
        </div>
        
    </div>
  )
}

export default NavBar