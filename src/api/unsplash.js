import axios from "axios";
import { fetchCityName } from "./geonames";

export const fetchCityPhoto = async (searchText) => {
  try {
    const cityResults = await fetchCityName(searchText);
    if (cityResults.length === 0) {
      throw new Error("Aucune ville trouvée.");
    }
    const cityName = cityResults[0].name;
    const countryName = cityResults[0].country;

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: `${cityName}, ${countryName}`,
        per_page: 5,
        order_by: "relevant",
        client_id: "kBirnMPdsr_Qsx8MB6yuV3ILwBuYza3vzbb_2LLm2fE",
      },
    });
    if (!response.data.results || response.data.results.length === 0) {
      throw new Error("Aucune photo trouvée pour cette ville.");
    }
    const photo = response.data.results[0];
    return {
      imageUrl: photo.urls.regular,
      photographer: photo.user.name,
    };
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche de la photo :", error);
    return null;
  }
};
