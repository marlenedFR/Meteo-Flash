import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";
import { fetchCities, fetchCityByCoordinates } from "../../api/weatherbit";
import { fetchCityPhoto } from "../../api/unsplash";
import { fetchCityName } from "../../api/geonames";
import { Icon } from "semantic-ui-react";

function SearchBar({ onSearch }) {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const suggestionsRef = useRef(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (value !== "") {
      const cityResults = await fetchCityName(value);
      setCitySuggestions(cityResults);
      setHighlightedIndex(-1);
    } else {
      setCitySuggestions([]);
    }
  };

  const handleCitySelect = async (city) => {
    setSearchText(city.name);

    const cityResults = await fetchCities(city.name);
    const photoResults = await fetchCityPhoto(city.name);
    onSearch([city], cityResults, photoResults);

    setCitySuggestions([]);
  };

  const handleSearchFieldClick = () => {
    setSearchText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      highlightPreviousCity();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      highlightNextCity();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        selectHighlightedCity();
      } else {
        const city = { name: searchText };
        handleCitySelect(city);
      }
    }
  };

  const highlightPreviousCity = () => {
    setHighlightedIndex((prevIndex) =>
      prevIndex <= 0 ? citySuggestions.length - 1 : prevIndex - 1
    );

    if (suggestionsRef.current) {
      suggestionsRef.current.scrollTop -= 25;
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback
      );
    } else {
      console.log("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
  };

  const successCallback = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const cityResults = await fetchCityByCoordinates(latitude, longitude);
    const photoResults = await fetchCityPhoto(cityResults[0].name);
    onSearch(cityResults, cityResults, photoResults);
  };

  const errorCallback = (error) => {
    console.log("Une erreur s'est produite lors de la récupération de la position :", error);
  };

  const highlightNextCity = () => {
    setHighlightedIndex((prevIndex) =>
      prevIndex === citySuggestions.length - 1 ? 0 : prevIndex + 1
    );

    if (suggestionsRef.current) {
      suggestionsRef.current.scrollTop += 30; // Ajustez cette valeur selon vos besoins
    }
  };

  const selectHighlightedCity = () => {
    if (highlightedIndex >= 0 && highlightedIndex < citySuggestions.length) {
      const city = citySuggestions[highlightedIndex];
      handleCitySelect(city);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    selectHighlightedCity();
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setCitySuggestions([]);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleKeyUp = (e) => {
    if (
      e.key === "Enter" ||
      e.key === "Done" ||
      e.key === "Ok" ||
      e.keyCode === 13 ||
      e.keyCode === 229
    ) {
      handleFormSubmit(e);
    }
  };
  

  return (
    <div className="ui icon input">
      <form className="searchform" onSubmit={handleFormSubmit}>
        <div className="input-wrapper">
          <input
            className="searchbarinput"
            type="input"
            id="searchbar"
            placeholder="Rechercher une ville..."
            value={searchText}
            onChange={handleInputChange}
            onClick={handleSearchFieldClick}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
          <p>
            <div className="location-icon" onClick={handleLocationClick}>
              <Icon name="map marker alternate" />
            </div>
          </p>
        </div>
      </form>
      {searchText !== "" && citySuggestions.length > 0 && (
        <div className="suggestions" ref={suggestionsRef}>
          <div className="suggestions-message">-- Suggestions -- </div>
          {citySuggestions.map((city, index) => (
            <div
              key={index}
              onClick={() => handleCitySelect(city)}
              className={index === highlightedIndex ? "highlighted" : ""}
            >
              {city.name}, {city.code}
            </div>
          ))}
        </div>
      )}
    </div>

  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
