import React from "react";
import "./footer.scss"; // Import your footer styles if you're using SCSS
import FacebookIcon from "../../Assets/images/icons/Icon-facebook.svg";
import InstagramIcon from "../../Assets/images/icons/Icon-instagram.svg";
import TwitterIcon from "../../Assets/images/icons/Icon-twitter.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="gym-info">
          <h3>Aspire Fitness Gym</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={FacebookIcon} alt="Facebook Icon"/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={InstagramIcon} alt="Instagram Icon"/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={TwitterIcon} alt="Twitter Icon"/>
            </a>
          </div>
          <p>
            Address: 123 Gym Street, Cityville, State 56789
            <br />
            Phone: (123) 456-7890
            <br />
            Email: info@aspirefitness.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
