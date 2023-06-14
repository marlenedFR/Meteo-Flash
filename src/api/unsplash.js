import axios from "axios";

export const fetchCityPhoto = async (searchText) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: searchText,
        per_page: 10,
        client_id: "kBirnMPdsr_Qsx8MB6yuV3ILwBuYza3vzbb_2LLm2fE",
      },
    });

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error("Aucune photo trouvée pour cette ville.");
    }

    const photos = response.data.results;
    const randomIndex = Math.floor(Math.random() * photos.length); // Génère un index aléatoire parmi les photos disponibles
    const photo = photos[randomIndex];

    return {
      imageUrl: photo.urls.regular,
      photographer: photo.user.name,
    };
  } catch (error) {
    // Gérer les erreurs ici
    console.log("Une erreur s'est produite lors de la recherche de la photo :", error);
    return null;
  }
};
