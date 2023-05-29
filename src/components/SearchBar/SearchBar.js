import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";
import { fetchCities } from "../../api/owm";

function SearchBar({ onSearch }) {

  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    // Empêche le rechargement de la page
    e.preventDefault();
    performSearch();
  };

  const handleIconClick = () => {
    performSearch();
  };

  const performSearch = async () => {
    const filteredCities = await fetchCities(searchText);
    onSearch(filteredCities);
  };

  return (
    <div className="ui icon input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Rechercher une ville..."
          onChange={handleInputChange}
        />
        <i
          className="circular search link icon"
          onClick={handleIconClick}
        ></i>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;