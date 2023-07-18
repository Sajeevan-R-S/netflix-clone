import React from "react";

function Button({ onclick, label, largeButton }) {
  return largeButton ? (
    <button className=" w-[300px] sm:w-[350px] h-[48px]" onClick={onclick}>
      {label}
    </button>
  ) : (
    <button onClick={onclick}>{label}</button>
  );
}

export default Button;
