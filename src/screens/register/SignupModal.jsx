import React, { useState } from "react";
import {
  Modal,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
const API_URL = import.meta.env.VITE_API_URL;
const SignupModal = ({ open, onClose, navToLogin }) => {
  // Setting up local state for login form input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  // Action for register form submit
  const handleSignup = async (e) => {
    e.preventDefault();
    // Checking for password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Posting register data to save in database
    try {
      const { data } = await axios.post(
        `${API_URL}/user/register`,
        { name: username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
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

      navToLogin();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.message || "Failed to register. Please try again.");
    }

    // console.log(email, password);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "12vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          p: 3,
          borderRadius: 4,
          maxWidth: "80%",
          width: "auto",
        }}
      >
        <div style={{ display: "flex" }}>
          <Typography variant="h6" sx={{ textAlign: "center", flexGrow: 1 }}>
            Sign up
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ "&:hover": { backgroundColor: "red" } }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSignup}>
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

          <Typography variant="body1" sx={{ padding: "6px" }}>
            Already have an account?{" "}
            {/* <Link to="/login">
            <strong>Login</strong>
          </Link> */}
            <Typography variant="contained" onClick={navToLogin}>
              <strong>Login</strong>
            </Typography>
          </Typography>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </Box>
    </Modal>
  );
};

export default SignupModal;
