import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CreateGroupForm from "./CreateGroupForm";
const CreateGroup = () => {
  return (
    <div
      className="creategroup-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <img
        src="/Assets/Images/createprivategroup.jpg"
        alt="creategroupbackground"
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      />
      <Typography variant="h4" sx={{ fontSize: "1.3rem", textAlign: "center" }}>
        Get your fitness squad together effortlessly!
      </Typography>
      <Typography sx={{ padding: "1rem" }}>
        Join our vibrant challenges{" "}
        <Link
          to="/joingroup"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            // backgroundColor: "skyblue",
            cursor: "pointer",
          }}
        >
          here
        </Link>{" "}
        and kickstart your fitness journey with the ultimate motivation.{" "}
      </Typography>

      <CreateGroupForm />
    </div>
  );
};

export default CreateGroup;
