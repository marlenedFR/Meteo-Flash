const convertTextToData = (text, searchText) => {
  const lines = text.split("\n");
  return lines
    .map((line) => {
      const parts = line.split("\t");
      const cityName = parts[1];
      const population = parseInt(parts[14]) || 0; // Convertir la population en nombre

      // Assurez-vous d'avoir un nom de ville et de pays
      if (!cityName) {
        // console.log(`Missing city name or country name: ${line}`);
        return null;
      }

      return {
        name: cityName,
        population: population,  // Ajouter la population aux données de la ville
      };
    })
    .filter(city => city !== null) // Enlever les villes non valides
    .filter(city =>
      city.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => b.population - a.population)  // Trier les villes par population
    .slice(0, 5); // Sélectionner les 5 villes les plus peuplées};

};



// Fonction pour récupérer les villes à partir du fichier texte local
export const fetchCityName = async (searchText) => {
  try {
    const response = await fetch("/data.txt");

    if (!response.ok) {
      throw new Error("Une erreur s'est produite lors de la recherche des villes.");
    }

    const fileContent = await response.text();

    const citiesData = convertTextToData(fileContent, searchText);

    // console.log(citiesData); // Ajout de cette ligne pour afficher les données


    return citiesData;

  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};
