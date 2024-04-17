import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NavbarLogo = ({ webLogo }) => {
  const [gradientColor, setGradientColor] = useState("");

  useEffect(() => {
    // Function to generate a random gradient color
    const generateRandomGradient = () => {
      const randomColor1 =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      const randomColor2 =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      return `linear-gradient(to bottom, ${randomColor1}, ${randomColor2})`;
    };

    // Update gradient color every second
    const intervalid = setInterval(() => {
      const newGradientColor = generateRandomGradient();
      setGradientColor(newGradientColor);
    }, 1000);

    // Cleanup function to clear interval
    return () => clearInterval(intervalid);
  }, []); // Run only once on component mount

  {
    /* <NavLink
            to="/"
            style={{
              textDecoration: "none",
              backgroundImage: "linear-gradient(to bottom, #9ffcfb, #c8ff12)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              // display: "inline-block", // Ensure button occupies space even if text is transparent
            }}
          >
            <img src={webLogo} alt="websiteLogo" height={"30px"} />{" "}
            <strong>fitBUDDY</strong>
          </NavLink> */
  }

  return (
    <NavLink
      to="/"
      style={{
        textDecoration: "none",
        backgroundImage: gradientColor,
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      <img src={webLogo} alt="websiteLogo" height="30px" />{" "}
      <strong>fitBUDDY</strong>
    </NavLink>
  );
};

export default NavbarLogo;
