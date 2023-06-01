import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";
import { fetchCities } from "../../api/owm";
import { fetchCityPhoto } from "../../api/unsplash";
// import { fetchCityName } from "../../api/geonames";
import debounce from "lodash.debounce";

function SearchBar({ onSearch }) {

  const [searchText, setSearchText] = useState("");  // État (state) pour stocker le texte de recherche saisi par l'utilisateur

  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value; // Valeur saisie par l'utilisateur
    setSearchText(value); // Met à jour l'état (state) avec la valeur saisie par l'utilisateur à chaque changement de saisie
    if (value.length >= 3) {
      const suggestions = ["Paris", "New York", "Tokyo"]; // Liste de suggestions de villes en dur
      setSuggestions(suggestions);
      // const results = await fetchCityName(value);
      // setSuggestions(results);
    } else {
      setSuggestions([]);
    }  
  };

  const debouncedHandleInputChange = debounce(handleInputChange, 500);

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    performSearch(); // Appelle la fonction "performSearch" plus bas pour effectuer la recherche
  };

  const handleIconClick = () => {
    performSearch(); // Appelle la fonction "performSearch" plus bas pour effectuer la recherche
  };

  const handleSuggestionClick = (cityName) => {
    setSearchText(cityName);
    setSuggestions([]);
    performSearch();
  };

  const performSearch = async () => {
    const cityResults = await fetchCities(searchText); // Effectue la recherche des villes correspondant au texte de recherche. La fonction "fetchCities" se trouve dans l'API owm.js
    const photoResults = await fetchCityPhoto(searchText); // Appel à la deuxième API pour récupérer les photos correspondantes
    onSearch(cityResults, photoResults); // Appelle la fonction de recherche avec les villes filtrées comme argument
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0 || searchText.length < 3) {
      return null;
    }

    // Menu déroulant
    return (
      <select className="suggestions" onChange={(e) => handleSuggestionClick(e.target.value)}>
        <option value="">Rechercher une ville...</option>
        {suggestions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))};
      </select>
    );
  };

  return (
    <div className="ui icon input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchbar"
          placeholder="Rechercher une ville..."
          onChange={debouncedHandleInputChange} // Appelle la fonction pour gérer les changements de saisie
        />
        <i
          className="circular search link icon"
          onClick={handleIconClick} // Appelle la fonction pour gérer le clic sur l'icône de recherche
        ></i>
      </form>
      {renderSuggestions()}
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;