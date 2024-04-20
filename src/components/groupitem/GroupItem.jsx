import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GroupItem = ({ group, id }) => {
  const navigate = useNavigate();
  const handleExploreGroup = (e) => {
    e.preventDefault();
    navigate(`/publicgroups`);
  };

  return (
    <Box
      className="groupitem-container"
      width="20vw"
      minWidth="250px"
      minHeight="250px"
      maxHeight="30vh"
      display="flex"
      alignItems="center"
      gap={4}
      sx={{
        flexDirection: "column",
        borderRadius: "20px",
        justifyContent: "space-between",
        position: "relative", // Ensure the overlay is positioned relative to the box
        overflow: "hidden", // Hide overflow to ensure the video is contained within the box
      }}
    >
      {/* Video */}
      <video
        src={group.videoUrl}
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(80%)", // Adjust brightness to 50%
          zIndex: 1, // Ensure the video is behind the content
        }}
      ></video>

      {/* Content */}
      <div
        style={{
          position: "relative", // Ensure content is positioned relative to the box
          width: "20vw",
          minWidth: "250px",
          minHeight: "250px",
          maxHeight: "30vh",
          zIndex: 2, // Ensure content is above the video
          textAlign: "center",
          color: "white", // Set text color
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          padding: "8px 4px",
          height: "100%",
        }}
      >
        <h2>{group.groupName}</h2>
        <button
          onClick={handleExploreGroup}
          style={{
            padding: "3px 20px",
            alignSelf: "center",
            border: "2px solid white",
            backgroundColor: "black",
            color: "white",
            borderRadius: "20px",
            transition: "box-shadow 0.1s",
            "&:hover": {
              boxShadow: "0px 3px 6px rgba(255, 255, 255, 0.5)",
            },
          }}
        >
          <strong>Explore</strong>
        </button>
      </div>
    </Box>
  );
};

export default GroupItem;
