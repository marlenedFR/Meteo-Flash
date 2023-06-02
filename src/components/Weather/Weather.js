import React from "react";
import PropTypes from "prop-types";

function Weather({ cities }) {

  return (
    <div className="weather-container">
      {cities.map((city, index) => (
        <div key={index}>
          <h3>Ville : {city.name}</h3>
          <p>Température : {city.temperature} °</p>
          {/* Afficher le vent */}
        </div>
      ))}
    </div>
  );
}

Weather.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      temperature: PropTypes.number,
    })
  ).isRequired,
};

export default Weather;
