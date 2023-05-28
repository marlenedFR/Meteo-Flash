import React from "react";
import PropTypes from "prop-types";

function Weather({ result }) {

  return (
    <div className="weather-container">
      {result.map((city) => (
        <div key={city.name}>
          <h2>Ville : {city.name}</h2>
          <p>Température : {city.temperature} °</p>
        </div>
      ))}
    </div>
  );
}

Weather.propTypes = {
  result: PropTypes.array.isRequired,
};

export default Weather;
