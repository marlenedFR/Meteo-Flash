import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";

function Sidebar({ onClose, showSidebar }) {


  return (
    <div className={`sidebar ${showSidebar ? "open" : ""}`}>
      <i className="close icon" onClick={onClose}></i>
      <h3>À propos</h3>
      <p>Meteo Flash utilise des bases de données gratuites, par conséquent, les recherches sont limitées et les résultats peuvent ne pas refléter la réalité.</p>
      <p>Les suggestions affichent les villes les plus populaires avec une densité de population de 15000 habitants minimum. </p>
      <p>Les photos proviennent du site <a href="https://unsplash.com/" target="_blank" rel="noreferrer">Unsplash</a> et peuvent ne pas être pertinentes par rapport aux recherches effectuées.</p>
      <p>Le nombre de requêtes étant limitées, le site peut ne pas fonctionner correctement à certains moments.</p>
      <p>Merci de votre compréhension.</p>
    </div>

  );
  
}

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired,

};
  



export default Sidebar;
