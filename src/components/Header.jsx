import React from "react";
import Button from "./Button";

import logo from "../assets/netflixLogo.png";

function Header({ alt, onclickSignIn, showButton, onclickLogo }) {

  return (
    <div className="flex px-8 sm:px-16 justify-between items-center">
      <img onClick={onclickLogo} className="w-32 sm:w-48 cursor-pointer" src={logo} alt={alt} />
      {showButton && <Button label={"Sign In"} onclick={onclickSignIn} />}
    </div>
  );
}

export default Header;
