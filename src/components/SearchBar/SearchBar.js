import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";
import { fetchCities } from "../../api/weatherbit";
import { fetchCityPhoto } from "../../api/unsplash";
import { fetchCityName } from "../../api/geonames";

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

  return (
    <div className="ui icon input">
      <form className="searchform" onSubmit={handleFormSubmit}>
        <input
          className="searchbarinput"
          type="text"
          id="searchbar"
          placeholder="Rechercher une ville..."
          value={searchText}
          onChange={handleInputChange}
          onClick={handleSearchFieldClick}
          onKeyDown={handleKeyDown}
        />
        <div className="icon">
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
