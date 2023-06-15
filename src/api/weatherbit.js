import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHERBIT_API_KEY;

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Une erreur s'est produite lors de la récupération des données météo.");
    }
    const data = response.data;
    if (!Array.isArray(data.data)) {
      throw new Error("Les données renvoyées par l'API ne sont pas valides.");
    }
    return data.data;
  } catch (error) {
    // console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};

export const fetchCities = async (searchText) => { // Fetches current weather data for a city by its name
  const url = `https://api.weatherbit.io/v2.0/current?city=${searchText}&key=${API_KEY}`;
  const weatherData = await fetchWeatherData(url);

  const cities = weatherData.map((item) => ({ // Map raw data from the API into an array of city objects
    name: item.city_name,
    temperature: item.temp,
    weatherIcon: item.weather.icon,
    precipitations: item.precip,
  }));

  return cities;
};

export const fetchCityByCoordinates = async (latitude, longitude) => { // Fetches current weather data for a city by its coordinates (latitude and longitude)
  const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}`;
  const weatherData = await fetchWeatherData(url);

  const city = {   // Return the name of the city from the first item in the data array
    name: weatherData[0].city_name,
  };

  return [city];
};
