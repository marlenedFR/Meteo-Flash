/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import axios from "axios";
import { useEffect } from "react";

function MeteoWidget({ code, onWeatherFetched }) {    

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${code},fr&appid=${API_KEY}&units=metric`)
      .then(res => {
        if(typeof onWeatherFetched === "function"){
          onWeatherFetched({
            code: code,
            temperature: Math.round(res.data.main.temp),
            icon: res.data.weather[0].icon
          });
        }
      });
  }, 
  // > 3. On passe un tableau vide sinon on dit qu'on surveille toute modification du state, donc boucle infinie
  [code, onWeatherFetched]);

  return null (
  );
}

export default MeteoWidget;