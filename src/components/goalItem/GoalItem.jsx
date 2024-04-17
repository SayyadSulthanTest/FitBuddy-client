import { Box } from "@mui/material";
import React from "react";

const GoalItem = ({ goal }) => {
  console.log(goal);
  return (
    <Box
      className="goalitem-container"
      width="20vw"
      minHeight="500px"
      minWidth="400px"
      display="flex"
      alignItems="flex-start"
      gap={1}
      p={2}
      sx={{
        flexDirection: "column",
        position: "relative",
        color: "black",
        backgroundColor: "white",
        border: "2px solid black", // Ensure the overlay is positioned relative to the box
      }}
    >
      {/* Content */}
      <img src={goal.imageUrl} alt="goalItemImage" style={{ width: "100%" }} />
      <h3>{goal.goalName}</h3>
      <h5>{goal.goalTag}</h5>
      <p>{goal.goalDescription}</p>
    </Box>
  );
};

export default GoalItem;
