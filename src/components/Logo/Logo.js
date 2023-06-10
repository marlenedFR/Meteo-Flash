import React from "react";
import logo from "../../assets/images/logo.png";
import PropTypes from "prop-types";

function Logo({ weatherIcon }) {
  return (
    <div className="logo-container">
      { weatherIcon ? (
        <img className="weather-icon" src={`https://www.weatherbit.io/static/img/icons/${weatherIcon}.png`} alt="Weather Icon" />
      ) : (
        <img className="logo-image" src={logo} alt="Logo Meteo Flash" />
      )}
    </div>
  );
}

Logo.propTypes = {
  weatherIcon: PropTypes.string,

};

export default Logo;
