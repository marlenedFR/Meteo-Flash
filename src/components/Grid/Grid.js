import React, { useState } from "react";

import City from "../City/City";
import Weather from "../Weather/Weather";
import SearchBar from "../SearchBar/SearchBar";

import "./Grid.css";
import { fetchCityPhoto } from "../../api/unsplash";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Grid() {
  const [cities, setCityWeather] = useState([]);
  const [cityPhoto, setCityPhoto] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // Etat pour suivre si une recherche a été effectuée

  const handleSearch = async (filteredCities) => {
    setCityWeather(filteredCities);

    if (filteredCities.length > 0) {
      const photo = await fetchCityPhoto(filteredCities[0].name);
      setCityPhoto(photo);
    }
    setHasSearched(true);

  };

  return (
    <div className="grid">
      <div className="top-row">
        <Header />
      </div>
      <div className="middle-row">
        <SearchBar onSearch={handleSearch} />
      </div>
      {hasSearched ? (
        <div className={`bottom-row ${hasSearched ? "slide-in" : ""}`}>
          <City cityPhoto={cityPhoto} />
          <Weather cities={cities} />      
        </div>
      ) : null}
      <div className="footer-row">
        <Footer />
      </div>
    </div>
  );
}

export default Grid;
