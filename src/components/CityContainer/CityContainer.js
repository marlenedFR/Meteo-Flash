import React from "react";
import PropTypes from "prop-types";
import oups from "../../assets/images/oups.png";

import "./CityContainer.css";

import City from "../City/City";
import Weather from "../Weather/Weather";

function CityContainer({ cities, cityPhoto }) {
  return (
    <>
      {cityPhoto !== null ? (
        <City cityPhoto={cityPhoto} />
      ) : (
        <div className="no-photo-found">
          <img className="oups" src={oups} alt="Oups" />
          <p>Aucune photo trouvée pour cette ville.</p>
          <p className="comment">(source : <a href="https://unsplash.com" alt="Unsplash" target="_blank" rel="noreferrer">https://unsplash.com</a>)</p>
        </div>
      )}
      <div className="weather-city-container">
        {cities.length > 0 && <Weather cities={cities} />}
      </div>
    </>
  );
}

CityContainer.propTypes = {
  cities: PropTypes.array.isRequired,
  cityPhoto: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    photographer: PropTypes.string.isRequired,
  }),
};

export default CityContainer;
