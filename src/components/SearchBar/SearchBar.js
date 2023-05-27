import React from "react";
// import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="ui icon input">
      <input type="text" placeholder="Rechercher..." data-dashlane-rid="d57ebab79ca5031c" data-form-type="query" />
      <i className="circular search link icon"></i>
    </div>
    // <div className="searchbar-container">
    //   <form className="form-container" action="/rechercher" method="GET">
    //     <input type="text" name="search" placeholder="Indiquez un nom de ville" />
    //     <button type="submit">Rechercher</button>
    //   </form>
    // </div>
  );
}

export default SearchBar;
