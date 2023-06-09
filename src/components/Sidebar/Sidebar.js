import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";

function Sidebar({ onClose }) {


  return (
    <div className="sidebar">
      <i className="close icon" onClick={onClose}></i>
      <p>Meteo Flash utilise des bases de données gratuites, par conséquent, les recherches sont limitées et les résultats peuvent ne pas être exacts.</p>
      <p>Les suggestions affichent les villes les plus populaires avec une population de 15000 habitants minimum. </p>
      <p>Les photos des villes proviennent du site <a href="https://unsplash.com/" target="_blank" rel="noreferrer">Unsplash</a> et peuvent ne pas être pertinentes par rapport aux recherches effectuées.</p>
      <p>Le nombre de requêtes étant limitées, l&aposapplication peut ne pas fonctionner correctement à certains moments.</p>
      <p>Merci de votre compréhension.</p>
    </div>

  );
  
}

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
};
  



export default Sidebar;
