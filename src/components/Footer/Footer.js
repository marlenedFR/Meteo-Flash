import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      Fait avec <i className="heart outline icon"></i>
      <p>
        {/* LinkedIn profile link */}
        <a href="https://www.linkedin.com/in/marlenedfr/" className="footer-links" target="_blank" rel="noopener noreferrer">
          <i className="linkedin icon"></i>
        </a>
        {/* Twitter profile link */}
        <a href="https://twitter.com/marlened_fr" className="footer-links" target="_blank" rel="noopener noreferrer">
          <i className="twitter square icon"></i>
        </a>
        {/* GitHub profile link */}
        <a href="https://github.com/marlenedFR" className="footer-links" target="_blank" rel="noopener noreferrer">
          <i className="github square icon"></i>
        </a>
      </p>
    </div>
  );
}

export default Footer;
