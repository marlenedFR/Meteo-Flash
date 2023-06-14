import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./SearchBar.css";
import { Icon } from "semantic-ui-react";

import { fetchCityName } from "../../api/geonames";
import { fetchCityPhoto } from "../../api/unsplash";
import { fetchCities, fetchCityByCoordinates } from "../../api/weatherbit";

function SearchBar({ onSearch }) {
  const suggestionsRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);  
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => { // Use the useEffect hook to add event listeners when the component is mounted
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setCitySuggestions([]); // If the escape key is pressed, clear the city suggestions list
      }
    };
    document.addEventListener("keydown", handleEscapeKey);   // Add event listeners for the escape key and outside clicks
    document.addEventListener("click", handleOutsideClick); 
    return () => {   // Clean up function to remove event listeners when the component is unmounted
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  //**** Searchfield ****//
  const handleInputChange = async (e) => {  // This function is called whenever the user types into the search field
    const value = e.target.value;
    setSearchText(value);
    if (value !== "") {
      const cityResults = await fetchCityName(value); // API (geonames) call to fetch city names matching the entered value
      setCitySuggestions(cityResults); // Update city suggestions
      setHighlightedIndex(-1); // Reset the highlighted index
    } else {
      setCitySuggestions([]); // If the entered value is empty, reset city suggestions
    }
  };
  const handleSearchFieldClick = () => { // Event handler for search field clicks
    setSearchText(""); // Clear search field
  };
  const handleCitySelect = async (city) => {  // This function is called when a city from the suggestions is selected by the user
    setSearchText(city.name);
    const cityResults = await fetchCities(city.name); // Fetch city data and photos from API (weatherbit)
    const photoResults = await fetchCityPhoto(city.name); // Fetch city data and photos from API (unsplash)
    onSearch([city], cityResults, photoResults); // Execute the onSearch function passed as prop with the selected city data and photo
    setCitySuggestions([]); // Clear city suggestions
  };
  const handleFormSubmit = (e) => { // This function is triggered when the form is submitted
    e.preventDefault();
    selectHighlightedCity();   // Select the highlighted city when the form is submitted
  };
  const handleKeyUp = (e) => {
    if (
      e.keyCode === 13 ||
      e.keyCode === 229 // Key code for input method editor (IME) input on mobile devices
    ) {
      handleFormSubmit(e); // If Enter is pressed or mobile input is used, submit the form
    }
  };

  //**** Suggestions ****//
  const handleKeyDown = (e) => { // This function handles user input from the keyboard
    if (e.key === "ArrowUp") {
      e.preventDefault();
      highlightPreviousCity(); // Highlight the previous city in the suggestions list when the Up arrow key is pressed
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      highlightNextCity();  // Highlight the next city in the suggestions list when the Down arrow key is pressed
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {  // Select the highlighted city or the city currently entered in the search field when the Enter key is pressed
        selectHighlightedCity();
      } else {
        const city = { name: searchText };
        handleCitySelect(city);
      }
    }
  };
  const highlightPreviousCity = () => { // This function is used to highlight the previous city in the suggestions list
    setHighlightedIndex((prevIndex) =>  // If the first city is currently highlighted, highlight the last city, otherwise highlight the previous city
      prevIndex <= 0 ? citySuggestions.length - 1 : prevIndex - 1
    );
    if (suggestionsRef.current) {  // Scroll up in the suggestions list
      suggestionsRef.current.scrollTop -= 25;
    }
  };
  const highlightNextCity = () => { // This function is used to highlight the next city in the suggestions list
    setHighlightedIndex((prevIndex) => // If the last city is currently highlighted, highlight the first city, otherwise highlight the next city
      prevIndex === citySuggestions.length - 1 ? 0 : prevIndex + 1
    );
    if (suggestionsRef.current) {  // Scroll down in the suggestions list
      suggestionsRef.current.scrollTop += 30;
    }
  };
  const selectHighlightedCity = () => { // This function selects the highlighted city
    if (highlightedIndex >= 0 && highlightedIndex < citySuggestions.length) {
      const city = citySuggestions[highlightedIndex];
      handleCitySelect(city);
    }
  };
  const handleOutsideClick = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {   // If an outside element is clicked and it is not within the suggestions list, clear the city suggestions list
      setCitySuggestions([]);
    }
  };

  //**** Geolocation ****//
  const handleLocationClick = () => { // This function is triggered when the user clicks on the "Use my location" button
    if (navigator.geolocation) {  // Check if the browser supports the Geolocation API
      navigator.geolocation.getCurrentPosition(  // Get the current position of the device
        successCallback,
        errorCallback
      );
    } else {
      console.log("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
  };
  const successCallback = async (position) => { // This function is called if the Geolocation API successfully retrieves the current position
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const cityResults = await fetchCityByCoordinates(latitude, longitude);  // Fetch the city and the city photo corresponding to the current position
    const photoResults = await fetchCityPhoto(cityResults[0].name);
    onSearch(cityResults, cityResults, photoResults); // Execute the onSearch function passed as prop with the current city and photo
  };
  const errorCallback = (error) => { // This function is called if the Geolocation API fails to retrieve the current position
    console.log("Une erreur s'est produite lors de la récupération de la position :", error);
  };  

  return (
    <div className="form-wrapper">
      <form className="searchform" onSubmit={handleFormSubmit}>
        <input
          className="ui input"
          type="input"
          id="searchbar"
          placeholder="Rechercher une ville..."
          value={searchText}
          onChange={handleInputChange}
          onClick={handleSearchFieldClick}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      </form>
      {searchText !== "" && citySuggestions.length > 0 && (
        <div className="suggestions" ref={suggestionsRef}>
          <div className="suggestions-message">-- Suggestions -- </div>
          {citySuggestions.map((city, index) => (
            <div
              key={index}
              onClick={() => handleCitySelect(city)}
              className={index === highlightedIndex ? "highlighted" : ""}
            >
              {city.name}, {city.code}
            </div>
          ))}
        </div>
      )}      
      <div className="location-wrapper">
          Ou utiliser ma position :<Icon name="map marker alternate" onClick={handleLocationClick}/>
      </div>      
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
