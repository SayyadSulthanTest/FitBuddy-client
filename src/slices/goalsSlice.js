// activitySlice.js

import { createSlice } from "@reduxjs/toolkit";

export const goalsSlice = createSlice({
  name: "goals",
  initialState: {
    goalList: [
      {
        goalName: "Product",
        imageUrl: "/Assets/Images/cardio.jpg",
        goalTag: "Set Goals",
        goalDescription:
          "Our Product Team is dedicated to creating tools that empower users to set and achieve their fitness goals, providing a platform for progress tracking and celebrating success along the way.",
      },
      {
        goalName: "Progress Tracking",
        imageUrl: "/Assets/Images/cardio.jpg",
        goalTag: "Achieve Success",
        goalDescription:
          "Our Developer Team is constantly innovating to bring the latest technology to our users, ensuring a seamless experience in connecting with a community of like-minded fitness enthusiasts.",
      },
      {
        goalName: "Connect with Groups",
        imageUrl: "/Assets/Images/cardio.jpg",
        goalTag: "Empowerment through Fitness",
        goalDescription:
          "Our Marketing Team spreads the message of empowerment through fitness, engaging with our groups to inspire and motivate them on their wellness journey",
      },
    ],
  },
  reducers: {
    addGoal: (state, action) => {
      state.goalList.push(action.payload);
    },
    removeGoal: (state, action) => {
      state.goalList = state.goalList.filter(
        (activity) => activity !== action.payload
      );
    },
  },
});

export const goals = (state) => state.goals.goalList;

export const { addGoal, removeGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
