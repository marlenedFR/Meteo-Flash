import React from "react";
import "./Grid.css";
import Title from "../Title/Title";
import Logo from "../Logo/Logo";
import City from "../City/City";
import Weather from "../Weather/Weather";
import SearchBar from "../SearchBar/SearchBar";

function Grid() {
  return (
    <div className="grid">
      <div className="top-row">
        <Title />
        <Logo />
      </div>
      <div className="middle-row">
        <SearchBar />
      </div>
      <div className="bottom-row">
        <City />
        <Weather />
      </div>
    </div>
  );
}

export default Grid;
