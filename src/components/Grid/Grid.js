import React, { useState } from "react";

import City from "../City/City";
import Weather from "../Weather/Weather";
import SearchBar from "../SearchBar/SearchBar";

import "./Grid.css";
import { fetchCityPhoto } from "../../api/unsplash";
// import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Title from "../Title/Title";
import Logo from "../Logo/Logo";

function Grid() {
  const [cities, setCityWeather] = useState([]);
  const [cityPhoto, setCityPhoto] = useState(null);

  const handleSearch = async (filteredCities) => {
    setCityWeather(filteredCities);

    if (filteredCities.length > 0) {
      const photo = await fetchCityPhoto(filteredCities[0].name);
      setCityPhoto(photo);
    }
  };

  return (
    <div className="grid">
      <div className="top-row">
        <Logo />
        <Title />
      </div>
      <div className="middle-row">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid-city-container">
        <City cityPhoto={cityPhoto} />
      </div>
      <div className="weather-city-container">
        <Weather cities={cities} />      
      </div>
      <div className="footer-row">
        <Footer />
      </div>
    </div>
  );
}

export default Grid;
