import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";
import { fetchCities } from "../../api/owm";
import { fetchCityPhoto } from "../../api/unsplash";

function SearchBar({ onSearch }) {

  const [searchText, setSearchText] = useState("");  // État (state) pour stocker le texte de recherche saisi par l'utilisateur

  const handleInputChange = (e) => {
    setSearchText(e.target.value); // Met à jour l'état (state) avec la valeur saisie par l'utilisateur à chaque changement de saisie
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    performSearch(); // Appelle la fonction "performSearch" plus bas pour effectuer la recherche
  };

  const handleIconClick = () => {
    performSearch(); // Appelle la fonction "performSearch" plus bas pour effectuer la recherche
  };

  const performSearch = async () => {
    const cityResults = await fetchCities(searchText); // Effectue la recherche des villes correspondant au texte de recherche. La fonction "fetchCities" se trouve dans l'API owm.js
    const photoResults = await fetchCityPhoto(searchText); // Appel à la deuxième API pour récupérer les photos correspondantes
    onSearch(cityResults, photoResults); // Appelle la fonction de recherche avec les villes filtrées comme argument
  };

  return (
    <div className="ui icon input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Rechercher une ville..."
          onChange={handleInputChange} // Appelle la fonction pour gérer les changements de saisie
        />
        <i
          className="circular search link icon"
          onClick={handleIconClick} // Appelle la fonction pour gérer le clic sur l'icône de recherche
        ></i>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;