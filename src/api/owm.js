export const fetchCities = async (searchText) => {
  try {

    // const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&appid={f336b2b992d1b7775aae32ac811b5a5e}`);

    const response = await fetch(`http://api.weatherbit.io/v2.0/current?city=${searchText}&key=93fa85820eda4216992259143ab33a69`);
    
    if (!response.ok) {
      throw new Error("Une erreur s'est produite lors de la recherche des villes.");
    }

    const data = await response.json();
    if (!Array.isArray(data.data)) {
      throw new Error("Les données renvoyées par l'API ne sont pas valides.");
    }

    const cities = data.data.map((item) => {
      return {
        name: item.city_name,
        temperature: item.temp,
      };
    });
    return cities;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la recherche :", error);
    return [];
  }
};
  