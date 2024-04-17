// Register component has a form with username, email, password, confirm password on successful registeration user is navigated to Login page '/login'

// Imports
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import axios from "axios";

const Register = () => {
  // Setting up local state for login form input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  // Action for register form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Checking for password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Posting register data to save in database
    try {
      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/user/register`,
        { name: username, email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      // console.log(data);
      // If there is no response data received, throw an error
      if (!data) {
        throw new Error(response.message || "Failed to register.");
      }

      // On successful registration, user should login
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.message || "Failed to register. Please try again.");
    }

    // console.log(email, password);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter User Name"
            required
            autoComplete="username"
            fullWidth
            inputProps={{ minLength: 3 }}
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="Enter Email"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
            autoComplete="new-password"
            fullWidth
            inputProps={{ minLength: 8 }}
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            autoComplete="new-password"
            fullWidth
            inputProps={{ minLength: 8 }}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
        <Typography variant="body1">
          Already have an account?{" "}
          {/* <Link to="/login">
            <strong>Login</strong>
          </Link> */}
        </Typography>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Register;
