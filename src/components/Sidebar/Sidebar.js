import React from "react";
import PropTypes from "prop-types";

import "./Sidebar.css";

function Sidebar({ onClose, showSidebar, weatherIcon }) {
  return (
    <div className="sidebar-container" style={{ marginTop: weatherIcon ? "2em" : "0" }}>
      <div className={`sidebar ${showSidebar ? "open" : ""}`}>
        <i className="close icon" onClick={onClose}></i>
        <h3>À propos</h3>
        <p>Meteo Flash s&#39;appuie sur des bases de données gratuites, par conséquent, les recherches sont limitées et les résultats peuvent ne pas refléter la réalité.</p>
        <p>Les suggestions de recherche privilégient les villes les plus populaires ayant une densité de population d&#39;au moins 15 000 habitants.</p>
        <p>Les images affichées sont sélectionnées en fonction de leur pertinence générale et peuvent ne pas correspondre exactement à la ville recherchée.</p>
        <p>En raison de la limitation du nombre de requêtes que nous pouvons faire aux sources de données gratuites, le site peut parfois ne pas fonctionner comme prévu. Si vous rencontrez des problèmes, je vous invite à réessayer ultérieurement.</p>
        <p>Merci de votre compréhension.</p>
      </div>
    </div>
  );  
}

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired,
  weatherIcon: PropTypes.string,
};

export default Sidebar;
