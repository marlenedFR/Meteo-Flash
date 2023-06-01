import axios from "axios";

export const fetchCityName = async (searchText) => {
  try {
    const response = await axios.get(`http://api.geonames.org/search?q=${searchText}&maxRows=10&username=mrln`);
    if (response.status != 200) {
      throw new Error("Une erreur s'est produite lors de la recherche des villes.");
    }
    const data = response.data;
    console.log(data);
    if (!Array.isArray(data.geonames)) {
      throw new Error("Les données renvoyées par l'API ne sont pas valides.");
    }
    const cities = data.geonames.map((item) => {
      return {
        name: item.name,
      };
    });
    return cities;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};