import React, { useState } from "react";

import CityContainer from "../CityContainer/CityContainer";
import SearchBar from "../SearchBar/SearchBar";

import "./Grid.css";
import { fetchCityPhoto } from "../../api/unsplash";
import Footer from "../Footer/Footer";
import Title from "../Title/Title";
import Logo from "../Logo/Logo";
import { fetchCities } from "../../api/weatherbit";
import Sidebar from "../Sidebar/Sidebar";

function Grid() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [cities, setCityWeather] = useState([]);
  const [cityPhoto, setCityPhoto] = useState(null);
  const [showCityContainer, setShowCityContainer] = useState(false);

  const handleButtonClick = () => {
    setShowSidebar(!showSidebar);
  };

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
      {showSidebar && <Sidebar onClose={handleButtonClick} />}
      <div className="top-row">
        <Logo />
        <Title />
        <div className="sidebar-container">
          <button className="circular ui icon button" onClick={handleButtonClick}>
            <i className="icon info"></i>
          </button>
        </div>
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
