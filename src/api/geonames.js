import Fuse from "fuse.js";

const convertTextToData = (text, searchText) => {
  const lines = text.split("\n");

  const options = {
    keys: ["name"],
    threshold: 0.4,
  };

  const fuse = new Fuse(lines, options);
  const searchResults = fuse.search(searchText);

  const filteredResults = searchResults
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

  const regex = new RegExp(`^${searchText.slice(0, 3)}`, "i");
  const finalResults = filteredResults.filter((city) =>
    regex.test(city.name)
  );

  return finalResults.slice(0, 5);
};


export const fetchCityName = async (searchText) => {
  try {
    const response = await fetch("/data.txt");

    if (!response.ok) {
      throw new Error(
        "Une erreur s'est produite lors de la recherche des villes."
      );
    }

    const fileContent = await response.text();

    const citiesData = convertTextToData(fileContent, searchText);

    return citiesData;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};

