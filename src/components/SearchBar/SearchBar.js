import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="ui icon input">
      <input
        type="text"
        placeholder="Rechercher une ville, un pays..."
        data-form-type="query"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;