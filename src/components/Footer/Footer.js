import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      Made with <i className="heart outline icon"></i>by me
      <p>
        <a href="https://www.linkedin.com/in/marlenedfr/" className="footer-links" target="_blank" rel="noopener noreferrer">
          <i className="linkedin icon"></i>
        </a>
        <a href="https://twitter.com/marlened_fr" className="footer-links" target="_blank" rel="noopener noreferrer">
          <i className="twitter square icon"></i>
        </a>
        <a href="https://github.com/marlenedFR" className="footer-links" target="_blank" rel="noopener noreferrer">
          <i className="github square icon"></i>
        </a>
      </p>
    </div>
  );
}

export default Footer;
