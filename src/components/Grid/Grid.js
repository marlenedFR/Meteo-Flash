import React, { useState } from "react";

import City from "../City/City";
import Weather from "../Weather/Weather";
import SearchBar from "../SearchBar/SearchBar";

import "./Grid.css";
import { fetchCityPhoto } from "../../api/unsplash";
import Footer from "../Footer/Footer";
import Title from "../Title/Title";
import Logo from "../Logo/Logo";
import { fetchCities } from "../../api/owm";

function Grid() {
  const [cities, setCityWeather] = useState([]);
  const [cityPhoto, setCityPhoto] = useState(null);

  const handleSearch = async (filteredCities) => {
    const cityResults = await fetchCities(filteredCities[0].name);
    setCityWeather(cityResults);

    if (filteredCities.length > 0) {
      const photo = await fetchCityPhoto(filteredCities[0].name);
      setCityPhoto(photo);
    } else {
      setCityPhoto(null);
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
        {cities.length > 0 && cityPhoto && <City cityPhoto={cityPhoto} />}
        {cities.length > 0 && <div className="weather-city-container">
          <Weather cities={cities} /></div>}
      </div>
      <div className="footer-row">
        <Footer />
      </div>
    </div>
  );
}

export default Grid;
