import axios from "axios";

export const fetchCityName = async (searchText) => {
  try {
    const response = await axios.get("http://api.geonames.org/searchJSON?", {
      params: {
        q: searchText,
        maxRows: 5,
        username: "mrln",
        featureClass: "P", // Filtrer les résultats pour les villes
        orderby: "relevance",
      },
    });
    if (response.status !== 200) {
      throw new Error("Une erreur s'est produite lors de la recherche des villes.");
    }
    const data = response.data;
    if (!Array.isArray(data.geonames)) {
      throw new Error("Les données renvoyées par l'API ne sont pas valides.");
    }
    const citiesMap = new Map(); // Utiliser une carte pour stocker les villes par pays
    data.geonames.forEach((item) => {
      const cityName = item.name;
      const countryName = item.countryName;
      const countryCode = item.countryCode; // Ajouter le code du pays
      const countryCities = citiesMap.get(countryName) || [];
      countryCities.push({
        name: cityName,
        countryCode: countryCode, // Stocker le code du pays pour chaque ville
      });
      citiesMap.set(countryName, countryCities);
    });
    const cities = Array.from(citiesMap.entries()).map(([country, cityArray]) => {
      const uniqueCities = [...new Set(cityArray)]; // Supprimer les doublons de noms de ville
      return {
        name: uniqueCities[0].name, // Prendre la première ville unique du tableau
        country: country,
        countryCode: uniqueCities[0].countryCode, // Utiliser le code du pays de la première ville unique
      };
    });
    return cities;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};
