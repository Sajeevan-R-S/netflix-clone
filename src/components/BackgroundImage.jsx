import React from "react";

function BackgroundImage({ image }) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw"
      }}
    ></div>
  );
}

export default BackgroundImage;
