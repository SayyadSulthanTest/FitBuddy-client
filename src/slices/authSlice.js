import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "",
    name: "",
    email: "",
    pic: "",
    height: {
      unit: "ft",
      value: "",
    },
    weight: "",
    age: "",
    fitnessGoals: "",
    isLoggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      return {
        ...state,
        id: "",
        name: "",
        email: "",
        pic: "",
        height: "",
        weight: "",
        age: "",
        fitnessGoals: "",
        isLoggedIn: false,
      };
    },
  },
});

export const { login, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
