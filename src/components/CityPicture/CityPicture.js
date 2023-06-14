import React from "react";
import PropTypes from "prop-types";

/**
 * The CityPicture component displays a city photo and its associated photographer.
 *
 * @param {Object} cityPhoto - An object containing information about the city photo.
 * @returns {JSX.Element} The rendered CityPicture component.
 */
function CityPicture({ cityPhoto }) {

  return (
    <div className="city-container">
      {cityPhoto && (
        <div className="city-image">
          <img src={cityPhoto.imageUrl} alt="City" title={`Photographe: ${cityPhoto.photographer}`} />
        </div>
      )}
    </div>
  );
}

CityPicture.propTypes = {
  cityPhoto: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    photographer: PropTypes.string.isRequired,
  }),
};

export default CityPicture;
