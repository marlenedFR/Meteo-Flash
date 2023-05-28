import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function MeteoWidget({city, code}) {
    
  // > 8. Je stocke la donnée température (récupérée grâce à l'API) dans le state
  const [temperature, setTemperature] = useState(null);
  // > 12. Je stocke maintenant les icônes correspondants aux températures récupérées par l'appel à l'API
  const [icon, setIcon] = useState(null);

  // > 1. Appel à l'API avec le hook useEffect
  // > 2. Installation d'Axios => 'npm i axios'

  useEffect(() => {    

    // > 5. Ici, l'API_KEY se récupère sur le site 'openweathermap.org'. J'accède à mon API qui est stockée dans le fichier '.env'
    const API_KEY = process.env.REACT_APP_API_KEY;

    // > 4. Appel à l'API avec axios.get
    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${code},fr&appid=${API_KEY}&units=metric`)
    // J'adapte la requête avec les valeurs que je veux (indicatif pays, metrics, ...)

    // > 6. Je récupère ma valeur (promise)
      .then(res => {

        // > 9. Je récupère ce que je trouve dans mon console log. J'arrondis la température en ajoutant'Math.round'
        setTemperature(Math.round(res.data.main.temp));  
        // > 11. Je récupère les icônes correspondants aux températures récupérées par l'appel à l'API
        setIcon(res.data.weather[0].icon); // Le chemin d'accès suit la façon dont est organisée l'API

        // > 7. Je vérifie les données que je récupère
        console.log(res.data);
      });
  },

  // > 3. On passe un tableau vide sinon on dit qu'on surveille toute modification du state, donc boucle infinie
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  return (
    <div className="MeteoWidget">
      <div className="container">
        <div className="infos">
          <h3 className="city">{city}</h3>
          <p className="code">{code}</p>
        </div>

        <div className="temperature">
          {/* // > 13. J'affiche l'icône */ }
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />

          {/* // > 10. J'affiche la température récupérée dans le state */ }
          {temperature} °
        </div>
      </div>
    </div>
  );
}

MeteoWidget.propTypes = {
  city: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
};

export default MeteoWidget;