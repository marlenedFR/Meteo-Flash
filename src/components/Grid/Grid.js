import React from "react";
import Title from "../Title/Title";
import Logo from "../Logo/Logo";
import "./Grid.css";

function Grid() {
  return (
    <div className="grid">
      <div className="top-row">
        <Title />
        <Logo />
      </div>
      <div className="bottom-row">
        {/* <Square /> */}
        {/* <Square /> */}
      </div>
    </div>
  );
}

export default Grid;
