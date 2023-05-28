export const fetchCities = async (searchText) => {
  // Simulation d'une requête à l'API externe avec des données en dur
  // Vous pouvez ajuster les données en fonction de votre besoin de test
  const cities = [
    { name: "Paris" },
    { name: "Nantes" },
    { name: "Lyon" },
    { name: "Marseille" },
  ];
  
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );
  
  return filteredCities;
};
  