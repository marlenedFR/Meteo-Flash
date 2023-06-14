import axios from "axios";

export const fetchCityPhoto = async (searchText) => { // Fetches a random photo of a city from Unsplash
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {  // Make a GET request to Unsplash's photo search endpoint
      params: {
        query: searchText, // The search term is the name of the city
        per_page: 10, // Limit the response to 10 photos
        client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID,
      },
    });
    if (!response.data.results || response.data.results.length === 0) {
      throw new Error("Aucune photo trouvée pour cette ville.");
    }

    const photos = response.data.results;
    const randomIndex = Math.floor(Math.random() * photos.length); // Generate a random index to pick a photo from the array of results
    const photo = photos[randomIndex];

    return {
      imageUrl: photo.urls.regular,
      photographer: photo.user.name,
    };
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche de la photo :", error);
    return null;
  }
};
