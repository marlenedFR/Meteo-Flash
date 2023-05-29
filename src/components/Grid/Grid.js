import React, { useState } from "react";

import City from "../City/City";
import Title from "../Title/Title";
import Weather from "../Weather/Weather";
import SearchBar from "../SearchBar/SearchBar";

import "./Grid.css";
import Logo from "../Logo/Logo";
import { fetchCityPhoto } from "../../api/unsplash";

function Grid() {
  const [cities, setCityWeather] = useState([]);
  const [cityPhoto, setCityPhoto] = useState(null);

  const handleSearch = async (filteredCities) => {
    setCityWeather(filteredCities);

    if (filteredCities.length > 0) {
      const photo = await fetchCityPhoto(filteredCities[0].name); // Remplacez "filteredCities[0].name" par la propriété correspondant au nom de la ville dans le tableau filteredCities
      setCityPhoto(photo);
    }
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
        <City cityPhoto={cityPhoto} />
        <Weather cities={cities} />      
      </div>
    </div>
  );
}

export default Grid;
