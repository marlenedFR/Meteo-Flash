import React from "react";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="ui icon input">
      <input type="text" placeholder="Rechercher une ville, un pays..." data-form-type="query" />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default SearchBar;
