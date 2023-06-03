import axios from "axios";

export const fetchCities = async (searchText) => {
  try {
    const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${searchText}&key=93fa85820eda4216992259143ab33a69`);
    if (response.status != 200) {
      throw new Error("Une erreur s'est produite lors de la recherche des villes.");
    }
    const data = await response.data;
    // console.log(data);
    if (!Array.isArray(data.data)) {
      throw new Error("Les données renvoyées par l'API ne sont pas valides.");
    }
    const cities = data.data.map((item) => {
      return {
        name: item.city_name,
        temperature: item.temp,
        weatherIcon: item.weather.icon,
      };
    });
    return cities;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};
  