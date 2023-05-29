import axios from "axios";

export const fetchCityPhoto = async (searchText) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: searchText,
        per_page: 1, // Nombre de résultats à récupérer
        client_id: "kBirnMPdsr_Qsx8MB6yuV3ILwBuYza3vzbb_2LLm2fE", // API_KEY
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
