// Import Fuse library for fuzzy searching
import Fuse from "fuse.js";

const convertTextToData = (text, searchText) => { // Function to convert text data to a suitable format for searching
  const lines = text.split("\n"); // Split the text into lines
  const options = {   // Define options for Fuse search. 'name' field will be used for searching with a threshold of 0.4
    keys: ["name"],
    threshold: 0.4,
  };

  const fuse = new Fuse(lines, options);   // Initialize a new Fuse instance with the lines and options
  const searchResults = fuse.search(searchText); // Perform the search

  const filteredResults = searchResults // Process the search results: map them to an object containing city details, filter out cities with no name, and sort them by population in descending order
    .map((result) => {
      const fields = result.item.split("\t");
      const country = fields[8];
      return {
        code: country,
        name: fields[1],
        population: parseInt(fields[14]) || 0,
      };
    })
    .filter((city) => !!city.name)
    .sort((a, b) => b.population - a.population);

  const regex = new RegExp(`^${searchText.slice(0, 3)}`, "i");  // Create a regular expression to test against the first three characters of city names
  const finalResults = filteredResults.filter((city) =>  // Filter the results to only include cities where the name starts with the first three characters of the search text
    regex.test(city.name)
  );
  return finalResults.slice(0, 5);  // Return the top 5 results

};

export const fetchCityName = async (searchText) => { // Function to fetch city data from a text file and perform a search
  try {
    const response = await fetch(process.env.REACT_APP_DATA_FILE);  // Fetch the city data text file

    if (!response.ok) {  // If the fetch is not successful, throw an error
      throw new Error(
        "Une erreur s'est produite lors de la recherche des villes."
      );
    }
    const fileContent = await response.text();  // Get the content of the text file
    const citiesData = convertTextToData(fileContent, searchText); // Convert the text file content to city data and perform the search    

    return citiesData;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};