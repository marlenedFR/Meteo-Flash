import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Grid from "../Grid/Grid";
import Header from "../Header/Header";

function App() {
  
  return (
    <div className="App">
      <div className="App-container">
        <Header />
        <Grid />
      </div>
    </div>
  );
}

export default App;
