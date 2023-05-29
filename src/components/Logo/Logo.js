import React from "react";
import "./Logo.css";
import logo from "../../assets/images/logo.png";

function Logo() {
  return (
    <div className="logo-container">
      <img className="logo-image" src={logo} alt="Logo Meteo Flash" />
    </div>
  );
}

export default Logo;
