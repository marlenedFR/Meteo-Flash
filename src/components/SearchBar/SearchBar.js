import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";
import { fetchCities } from "../../api/weatherbit";
import { fetchCityPhoto } from "../../api/unsplash";
import { fetchCityName } from "../../api/geonames";

function SearchBar({ onSearch }) {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    // console.log(value); // Ajout de cette ligne pour afficher la valeur
    setSearchText(value);
    if (value !== "") {
      const cityResults = await fetchCityName(value);
      setCitySuggestions(cityResults);
      setHighlightedIndex(-1); // Réinitialiser l'index de mise en évidence
    } else {
      setCitySuggestions([]);
    }
  };

  const handleCitySelect = async (city) => {
    // console.log("Ville sélectionnée :", city);
    setSearchText(city.name);

    const cityResults = await fetchCities(city.name);
    const photoResults = await fetchCityPhoto(city.name);
    onSearch([city], cityResults, photoResults);

    setCitySuggestions([]); // Masquer la liste déroulante
  };

  const handleSearchFieldClick = () => {
    setSearchText(""); // Effacer le texte de recherche actuel
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
      selectHighlightedCity();
    }
  };

  const highlightPreviousCity = () => {
    setHighlightedIndex((prevIndex) =>
      prevIndex <= 0 ? citySuggestions.length - 1 : prevIndex - 1
    );
  };

  const highlightNextCity = () => {
    setHighlightedIndex((prevIndex) =>
      prevIndex === citySuggestions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const selectHighlightedCity = () => {
    if (highlightedIndex >= 0 && highlightedIndex < citySuggestions.length) {
      const city = citySuggestions[highlightedIndex];
      handleCitySelect(city);
    }
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
      <form className="searchform" onSubmit={(e) => e.preventDefault()}>
        <input
          className="searchbarinput"
          type="text"
          id="searchbar"
          placeholder="Rechercher une ville..."
          value={searchText}
          onChange={handleInputChange}
          onClick={handleSearchFieldClick} // Gestionnaire d'événements pour le clic dans le champ de recherche
          onKeyDown={handleKeyDown} // Gestionnaire d'événements pour les touches de clavier
        />
        <div className="icon">
          {/* <i className="search link icon"></i> */}
        </div>
      </form>
      {searchText !== "" && citySuggestions.length > 0 && (
        <div className="suggestions">
          {citySuggestions.map((city, index) => (
            <div
              key={index}
              onClick={() => handleCitySelect(city)}
              className={index === highlightedIndex ? "highlighted" : ""}
            >
              {city.name}
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
