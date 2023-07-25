import React from "react";
import HeaderImage from "../../Assets/images/aspire-header.svg";
import "./header.scss"

function Header() {
  return (
    <div className="header">
      <div className="header__image">
        <img src={HeaderImage} className="header__image--svg"></img>
      </div>
    </div>
  );
}

export default Header;
