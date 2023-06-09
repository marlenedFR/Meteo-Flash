import React, { useEffect, useState } from "react";
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

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Empêche la propagation du clic
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.closest(".sidebar-container") === null) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="grid">
      {showSidebar && <Sidebar onClose={handleButtonClick} showSidebar={showSidebar} />}
      <div className="top-row">
        <Logo />
        <Title />
        <div className="sidebar-container">
          {!showSidebar && (
            <i
              className="icon info circle"
              onClick={handleButtonClick}
            ></i>
          )}
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
