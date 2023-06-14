import React from "react";
import PropTypes from "prop-types";

import logo from "../../assets/images/logo.png";

function Logo({ weatherIcon }) { // Receives `weatherIcon` as a prop, which will be used to determine the image that will be displayed.
  return (
    <div className="logo-container">
      { // If `weatherIcon` prop is present, use it as a part of the URL to display a weather icon
        // Else, display the logo from the assets
        weatherIcon ? (
          <img className="weather-icon" src={`https://www.weatherbit.io/static/img/icons/${weatherIcon}.png`} alt="Weather Icon" />
        ) : (
          <img className="logo-image" src={logo} alt="Logo Meteo Flash" />
        )}
    </div>
  );
}

Logo.propTypes = {
  weatherIcon: PropTypes.string, // `weatherIcon` prop is expected to be a string. It's not required, because the logo will be displayed in case `weatherIcon` is not provided.
};

export default Logo;
