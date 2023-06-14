import axios from "axios";

const API_KEY = "93fa85820eda4216992259143ab33a69";

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Une erreur s'est produite lors de la récupération des données météo.");
    }

    const data = response.data;
    console.log(response.data);

    if (!Array.isArray(data.data)) {
      throw new Error("Les données renvoyées par l'API ne sont pas valides.");
    }

    return data.data;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};

export const fetchCities = async (searchText) => {
  const url = `https://api.weatherbit.io/v2.0/current?city=${searchText}&key=${API_KEY}`;
  const weatherData = await fetchWeatherData(url);

  const cities = weatherData.map((item) => ({
    name: item.city_name,
    temperature: item.temp,
    weatherIcon: item.weather.icon,
    precipitations: item.precip,
  }));

  return cities;
};

export const fetchCityByCoordinates = async (latitude, longitude) => {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}`;
  const weatherData = await fetchWeatherData(url);

  const city = {
    name: weatherData[0].city_name,
  };

  return [city];
};
