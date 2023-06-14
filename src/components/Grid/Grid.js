import React, { useEffect, useState } from "react";

import { fetchCities } from "../../api/weatherbit";
import { fetchCityPhoto } from "../../api/unsplash";

import "./Grid.css";

import Logo from "../Logo/Logo";
import Title from "../Title/Title";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar";
import CityContainer from "../CityContainer/CityContainer";

function Grid() {
  // State management using React's useState hook
  const [cities, setCityWeather] = useState([]);
  const [cityPhoto, setCityPhoto] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCityContainer, setShowCityContainer] = useState(false);

  //**** Sidebar ****//
  const handleButtonClick = (event) => {  // Function to handle the sidebar button click
    event.stopPropagation(); // Prevent click event propagation
    setShowSidebar(!showSidebar); // Toggle the sidebar visibility.
  };
  useEffect(() => {   // Using useEffect to add event listener for clicks outside the sidebar
    const handleOutsideClick = (event) => {
      if (event.target.closest(".sidebar") === null) {
        setShowSidebar(false); // If click is outside of the sidebar, close it
      }
    };
    document.addEventListener("click", handleOutsideClick); // Click event listener
    return () => {  // Cleanup function - Remove the event listener when the component unmounts
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array - this effect runs only on component mount and unmount

  //**** Searchbar ****//
  const handleSearch = async (filteredCities) => {  // Function to handle the search operation
    const cityResults = await fetchCities(filteredCities[0].name); // Fetch data for the first city from the filtered list
    setCityWeather(cityResults); // Update the city weather state with the fetched data.
    if (filteredCities.length > 0) {
      const photo = await fetchCityPhoto(filteredCities[0].name); // If there are filtered cities, fetch the city photo
      setCityPhoto(photo); // Update the city photo state with the fetched photo.
    } else {
      setCityPhoto(null); // If no filtered cities, reset the photo state
    }
    setShowCityContainer(true); // Make the city container visible after a search operation
  };

  return (
    <div className="grid">
      {/* Render the Sidebar if `showSidebar` is true. Pass the weather icon of the first city if available and sidebar visibility status to the Sidebar. */}
      {showSidebar &&
      <Sidebar weatherIcon={cities.length > 0 ? cities[0].weatherIcon : null} onClose={handleButtonClick} showSidebar={showSidebar} />}
      <div className="top-row">
        {/* Render the Logo component, passing the weather icon of the first city if available. */}
        <Logo weatherIcon={cities.length > 0 ? cities[0].weatherIcon : null} />
        <Title />
        {/* Render the information icon button if `showSidebar` is false. Handle button clicks with `handleButtonClick`. */}
        {!showSidebar && (
          <i className="icon info circle" onClick={handleButtonClick}></i>
        )}
      </div>
      <div className="middle-row">
        <SearchBar onSearch={handleSearch} />
      </div>
      {/* Render the city container if `showCityContainer` is true. Pass the `cities` and `cityPhoto` states to the CityContainer. */}
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
