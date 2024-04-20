import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import NavbarLogo from "./NavbarLogo.jsx";

import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, Link } from "react-router-dom";
import webLogo from "/Assets/Images/websitelogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import LoginModal from "../../screens/login/LoginModal";
import SignupModal from "../../screens/register/SignupModal";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Navbar = ({ logoutUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [openSignupModal, setOpenSignupModal] = React.useState(false);
  const userData = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNotHome = location.pathname !== "/";

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
    setOpenSignupModal(false);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleOpenSignupModal = () => {
    setOpenSignupModal(true);
    setOpenLoginModal(false);
  };

  const handleCloseSignupModal = () => {
    setOpenSignupModal(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    logoutUser();
    navigate("/");
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ background: isNotHome ? "black" : "inherit" }}
      >
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <NavbarLogo webLogo={webLogo} />
          </Typography>

          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}
          ></Typography>

          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {userData.isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: isNotHome ? "white" : "black",
                    fontSize: "1rem",
                  }}
                >
                  <strong>PROFILE</strong>
                </Link>
                <Button onClick={handleLogout}>
                  <strong style={{ color: isNotHome ? "white" : "black" }}>
                    Logout
                  </strong>
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleOpenSignupModal}>
                  <strong style={{ color: isNotHome ? "white" : "black" }}>
                    Signup
                  </strong>
                </Button>
                <Button onClick={handleOpenLoginModal}>
                  <strong style={{ color: isNotHome ? "white" : "black" }}>
                    Login
                  </strong>
                </Button>
              </>
            )}
          </Typography>

          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            sx={{
              color: isNotHome ? "white" : "black",
              display: { xs: "block", sm: "none" },
            }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {userData.isLoggedIn && (
              <MenuItem onClick={handleMenuClose}>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Profile
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={handleMenuClose}>
              {userData.isLoggedIn ? (
                <Button sx={{ color: "black" }} onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button sx={{ color: "black" }} onClick={handleOpenSignupModal}>
                  Signup
                </Button>
              )}
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              {!userData.isLoggedIn && (
                <Button sx={{ color: "black" }} onClick={handleOpenLoginModal}>
                  Login
                </Button>
              )}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <LoginModal
        open={openLoginModal}
        onClose={handleCloseLoginModal}
        navToSignUp={handleOpenSignupModal}
      />
      <SignupModal
        open={openSignupModal}
        onClose={handleCloseSignupModal}
        navToLogin={handleOpenLoginModal}
      />
    </>
  );
};

export default Navbar;
