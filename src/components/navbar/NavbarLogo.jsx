import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NavbarLogo = ({ webLogo }) => {
  const [gradientColor, setGradientColor] = useState("");

  useEffect(() => {
    const generateRandomGradient = () => {
      const randomColor1 =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      const randomColor2 =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      return `linear-gradient(to bottom, ${randomColor1}, ${randomColor2})`;
    };

    const intervalid = setInterval(() => {
      const newGradientColor = generateRandomGradient();
      setGradientColor(newGradientColor);
    }, 1000);

    return () => clearInterval(intervalid);
  }, []);

  return (
    <NavLink
      to="/"
      style={{
        textDecoration: "none",
        backgroundImage: gradientColor,
        WebkitBackgroundClip: "text",
        color: "transparent",
        fontSize: "2rem",
        fontWeight: "bold",
      }}
    >
      <img
        src={webLogo}
        alt="websiteLogo"
        height="30px"
        style={{ paddingRight: "1rem" }}
      />
      fitBUDDY
    </NavLink>
  );
};

export default NavbarLogo;
