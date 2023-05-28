import React, { useState } from "react";

import City from "../City/City";
import Title from "../Title/Title";
import Weather from "../Weather/Weather";
import SearchBar from "../SearchBar/SearchBar";

import "./Grid.css";
import Logo from "../Logo/Logo";

function Grid() {
  // Stocker le résultat de la recherche
  const [result, setResult] = useState([]);
  const handleSearch = (filteredCities) => {
    console.log(filteredCities);
    setResult(filteredCities);
  };

  return (
    <div className="grid">
      <div className="top-row">
        <Title />
        <Logo />
      </div>
      <div className="middle-row">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="bottom-row">
        <City />
        <Weather result={result} />      
      </div>
    </div>
  );
}

export default Grid;
