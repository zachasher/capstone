import React from "react";
import "./nav-bar.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/images/aspire-logo.svg";

function NavBar() {
  const [navbarClass, setNavbarClass] = useState("navbar navbar-transparent");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // Update the class name based on the scroll position
    if (scrollPosition > 10) {
      setNavbarClass("navbar navbar-solid");
    } else {
      setNavbarClass("navbar navbar-transparent");
    }
  };


  return (
    <div className={navbarClass}>
      <Link to={'/'} className="logo-container"><img src={Logo} className="logo-container__image"/></Link>
      <div className="navbar__links">
        <Link to={'/classes'}>
          <p className="navbar__link">CLASSES</p>
        </Link>
        <Link><p className="navbar__link">CONTACT</p></Link>
        <Link to={'/login'}><p className="navbar__link">LOGIN</p></Link>
      </div>
    </div>
  );
}

export default NavBar;
