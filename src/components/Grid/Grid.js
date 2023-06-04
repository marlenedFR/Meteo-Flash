import React, { useState } from "react";

import CityContainer from "../CityContainer/CityContainer";
import SearchBar from "../SearchBar/SearchBar";

import "./Grid.css";
import { fetchCityPhoto } from "../../api/unsplash";
import Footer from "../Footer/Footer";
import Title from "../Title/Title";
import Logo from "../Logo/Logo";
import { fetchCities } from "../../api/weatherbit";

function Grid() {
  const [cities, setCityWeather] = useState([]);
  const [cityPhoto, setCityPhoto] = useState(null);
  const [showCityContainer, setShowCityContainer] = useState(false);

  const handleSearch = async (filteredCities) => {
    const cityResults = await fetchCities(filteredCities[0].name);
    setCityWeather(cityResults);

    if (filteredCities.length > 0) {
      const photo = await fetchCityPhoto(filteredCities[0].name);
      setCityPhoto(photo);
    } else {
      setCityPhoto(null);
    }

    setShowCityContainer(true);
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
      {showCityContainer && (
        <div className="grid-city-container">
          <CityContainer cities={cities} cityPhoto={cityPhoto} />
        </div>
      )}
      <div className="footer-row">
        <Footer />
      </div>
    </div>
  );
}

export default Grid;
