import React from "react";
import PropTypes from "prop-types";

function Weather({ cities }) {

  return (
    <div className="weather-container">
      {cities.map((city, index) => (
        <div key={index}>
          <h2>Ville : {city.name}</h2>
          <p>Température : {city.temperature} °</p>
          <p>Clouds : {city.clouds}</p>
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
      clouds: PropTypes.number,
    })
  ).isRequired,
};

export default Weather;
