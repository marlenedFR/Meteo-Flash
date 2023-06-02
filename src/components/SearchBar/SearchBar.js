import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";
import { fetchCities } from "../../api/owm";
import { fetchCityPhoto } from "../../api/unsplash";
import { fetchCityName } from "../../api/geonames";

function SearchBar({ onSearch }) {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value !== "") {
      const cityResults = await fetchCityName(value);
      setCitySuggestions(cityResults);
    } else {
      setCitySuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  const performSearch = async () => {
    if (selectedCity) {
      const cityResults = await fetchCities(selectedCity.name);
      const photoResults = await fetchCityPhoto(selectedCity.name, selectedCity.country);
      onSearch([selectedCity], cityResults, photoResults);
      setCitySuggestions([]);
    }
  };

  const handleCitySelect = (city) => {
    console.log("Ville sélectionnée :", city);
    setSelectedCity(city);
    setSearchText(city.name + ", " + city.country);
    performSearch();
  };

  return (
    <div className="ui icon input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchbar"
          placeholder="Rechercher une ville..."
          value={searchText}
          onChange={handleInputChange}
        />
        <i className="circular search link icon"></i>
      </form>
      <div className="suggestions">
        {citySuggestions.map((city, index) => (
          <div key={index} onClick={() => handleCitySelect(city)}>
            {city.name + ", " + city.country}
          </div>
        ))}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
