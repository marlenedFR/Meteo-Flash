import React from "react";
import PropTypes from "prop-types";

function City({ cityPhoto }) {

  return (
    <div className="city-container">
      {cityPhoto ? (
        <div className="city-image">
          <img src={cityPhoto.imageUrl} alt="City" />
          <p>Photographer: {cityPhoto.photographer}</p>
        </div>
      ) : (
        {/* <p>Aucune photo trouvée</p> */}
      )}
    </div>
  );
}

City.propTypes = {
  cityPhoto: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    photographer: PropTypes.string.isRequired,
  }),
};

export default City;
