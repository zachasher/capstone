import React from "react";
import HeaderImage from "../../Assets/images/Aspire-Header.png";
import "./header.scss"

function Header() {
  return (
    <div className="header">
      <div className="header__image">
        <img src={HeaderImage} className="header__image--jpg"></img>
      </div>
    </div>
  );
}

export default Header;
