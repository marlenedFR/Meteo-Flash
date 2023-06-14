import React from "react";
import PropTypes from "prop-types";

import "./CityContainer.css";

import oupsImage from "../../assets/images/oups.png";

import Weather from "../Weather/Weather";
import CityPicture from "../CityPicture/CityPicture";

/**
 * The CityContainer component displays city-related information,
 * including a city photo and weather data.
 *
 * @param {Array} cities - An array of cities.
 * @param {Object} cityPhoto - An object containing information about the city photo.
 * @returns {JSX.Element} The rendered CityContainer component.
 */

function CityContainer({ cities, cityPhoto }) {
  /**
   * Renders the content when no photo is found for a city.
   *
   * @returns {JSX.Element} The rendered content for no photo found.
   */
  const renderNoPhotoFound = () => (
    <div className="no-photo-found">
      <img className="oups-image" src={oupsImage} alt="Oups-Image" />
      <p>Aucune photo trouvée pour cette ville.</p>
      <p className="comment">
        (source :{" "}
        <a
          href="https://unsplash.com"
          alt="Unsplash"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00000071" }}
        >
          Unsplash.com
        </a>
        )
      </p>
    </div>
  );

  return (
    <>
      {cityPhoto ? (
        <CityPicture cityPhoto={cityPhoto} />
      ) : (
        renderNoPhotoFound()
      )}
      <div className="weather-city-container">
        {cities.length > 0 &&
        <Weather cities={cities} />
        }
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
