import React from "react";
import "./Loading.css"; // Import the CSS file for styling

const Loading = () => {
  return (
    <div
      className="loading-circle-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loading-circle"></div>
    </div>
  );
};

export default Loading;
