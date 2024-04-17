import React from "react";
import { Grid, Paper } from "@mui/material";
const FitnessProgress = () => {
  return (
    <div className="fitnessprogress-container">
      <Grid item xs={12}>
        <Paper sx={{ padding: "10px" }}>
          <h3>Fitness Progress</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                padding: "20px 30px",
                textAlign: "center",
                color: "white",
                backgroundColor: "#00647A",
              }}
            >
              <h4>16</h4>
              <p>Completed</p>
            </div>
            <div
              style={{
                padding: "20px 30px",
                textAlign: "center",
                color: "white",
                backgroundColor: "#00647A",
              }}
            >
              <h4>28</h4>
              <p>In Progress</p>
            </div>

            <div
              style={{
                padding: "20px 30px",
                textAlign: "center",
                color: "white",
                backgroundColor: "#00647A",
              }}
            >
              <h4>12</h4>
              <p>Not Started</p>
            </div>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default FitnessProgress;
