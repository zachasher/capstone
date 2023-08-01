import React from "react";
import "./nav-bar.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/images/aspire-logo.svg";
import axios from "axios";

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
    if (scrollPosition > 1) {
      setNavbarClass("navbar navbar-solid");
    } else {
      setNavbarClass("navbar navbar-transparent");
    }
  };

  //USER AUTHENTICATION
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        return setFailedAuth(true);
      }

      try {
        const { data } = await axios.get(
          "http://localhost:8080/users/current",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data);
      } catch (error) {
        console.log(error);
        setFailedAuth(true);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
    window.location.reload();
  };


  return (
    <div className={navbarClass}>
      <Link to={'/'} className="logo-container"><img src={Logo} className="logo-container__image"/></Link>
      <div className="navbar__links">
        <Link to={'/classes'}>
          <p className="navbar__link">CLASSES</p>
        </Link>
        <Link to={'/profile'}><p className="navbar__link">PROFILE</p></Link>
        {user ? (
        <button onClick={handleLogout} className="navbar__logout">LOG OUT</button>
      ) : (
        <Link to={'/login'}><p className="navbar__link">LOGIN</p></Link>
      )}
      </div>
    </div>
  );
}

export default NavBar;
