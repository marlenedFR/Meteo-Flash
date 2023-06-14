import React from "react";

import PropTypes from "prop-types";

import "./Weather.css";

function Weather({ cities }) {

  function getPrecipitationsMessage(precipitations) {  // Define a function that returns a precipitation message based on the precipitation value. If precipitation is more than 0, it's raining. If not, it's not raining.
    if (precipitations > 0) {
      return (
        <>
        Il pleut actuellement ! <span role="img" aria-label="umbrella">&#x2602;&#xFE0F;</span>
        </>
      );
    } else {
      return  (       
        <>
      Il ne pleut pas actuellement <span role="img" aria-label="smiley">&#x1F600;&#xFE0F;</span>      
        </>
      );
    }
  }
  return (
    <div className="weather-container">
      {cities.map((city, index) => (
        <div key={index}>
          <h3>Ville : {city.name}</h3>
          <p>Température : {city.temperature} °</p>
          <p>
            {city.precipitations !== undefined ? (
              getPrecipitationsMessage(city.precipitations)
            ) : (
              "Pas d'informations sur la pluie disponibles"
            )}
          </p>
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
      precipitations: PropTypes.number,
    })
  ).isRequired,
};

export default Weather;
