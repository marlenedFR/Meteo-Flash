import React from "react";
import "./Weather.css";
import PropTypes from "prop-types";

function Weather({ cities }) {
  // const [showExtraData, setShowExtraData] = useState(false);

  function getPrecipitationsMessage(precipitations) {
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
            {/* <i className="plus icon" onClick={() => setShowExtraData(!showExtraData)}></i> */}
            {/* <button onClick={() => setShowExtraData(!showExtraData)}> */}
            {/* {showExtraData ? "" : ""}
          
          {showExtraData && (
            <div className={`extra-data-container ${showExtraData ? "show" : ""}`}>
              <h4>Informations supplémentaires pour {city.name}</h4>              
            </div> */}
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
