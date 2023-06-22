import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const ApiUrl = "https://api.openweathermap.org/data/2.5";

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Une erreur s'est produite lors de la récupération des données météo.");
    }
    const data = response.data;
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchCities = async (searchText) => {
  const url = `${ApiUrl}/weather?q=${searchText}&appid=${API_KEY}&units=metric&lang=fr`;
  const weatherData = await fetchWeatherData(url);

  if (!weatherData) {
    return [];
  }
  const temperature = Math.floor(weatherData.main.temp);

  const city = {
    name: weatherData.name,
    temperature,
    weatherIcon: weatherData.weather[0].icon,
    precipitations: weatherData.rain ? weatherData.rain["1h"] : 0,
  };

  return [city];
};

export const fetchCityByCoordinates = async (latitude, longitude) => {
  const url = `${ApiUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  const weatherData = await fetchWeatherData(url);

  if (!weatherData) {
    return [];
  }

  const city = {
    name: weatherData.name,
    temperature: weatherData.main.temp,
    weatherIcon: weatherData.weather[0].icon,
    precipitations: weatherData.rain ? weatherData.rain["1h"] : 0,
  };

  return [city];
};
