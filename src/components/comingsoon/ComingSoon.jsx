import React from "react";
import { useNavigate } from "react-router-dom/dist";
const ComingSoon = () => {
  const navigate = useNavigate();
  const handleNavHome = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        // backgroundColor: "skyblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>We're working on this feature. It will be available soon. </h1>
      <button
        style={{ color: "black", backgroundColor: "inherit" }}
        onClick={handleNavHome}
      >
        <strong>Back</strong>{" "}
      </button>
    </div>
  );
};

export default ComingSoon;
