import React from "react";
import Logo from "../Logo/Logo";
import Title from "../Title/Title";
import "./Header.css";

function Header() {

  return (
    <div className="header">
      <Title />
      <Logo />
    </div>
  );
}

export default Header;
