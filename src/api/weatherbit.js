import axios from "axios";

export const fetchCities = async (searchText) => {
  try {
    const response = await axios.get(
      `https://api.weatherbit.io/v2.0/current?city=${searchText}&key=93fa85820eda4216992259143ab33a69`
    );

    if (response.status !== 200) {
      throw new Error("Une erreur s'est produite lors de la recherche des villes.");
    }

    const data = response.data;

    if (!Array.isArray(data.data)) {
      throw new Error("Les données renvoyées par l'API ne sont pas valides.");
    }

    const cities = data.data.map((item) => ({
      name: item.city_name,
      temperature: item.temp,
      weatherIcon: item.weather.icon,
    }));

    return cities;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};

export const fetchCityByCoordinates = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=93fa85820eda4216992259143ab33a69`
    );

    if (response.status !== 200) {
      throw new Error("Une erreur s'est produite lors de la recherche de la ville.");
    }

    const data = response.data;

    if (!Array.isArray(data.data)) {
      throw new Error("Les données renvoyées par l'API ne sont pas valides.");
    }

    const city = {
      name: data.data[0].city_name,
      temperature: data.data[0].temp,
      weatherIcon: data.data[0].weather.icon,
    };

    return [city];
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};
