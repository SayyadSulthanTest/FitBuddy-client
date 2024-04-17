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
  // console.log(userData);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNotHome = location.pathname !== "/";

  // useEffect(() => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const userData = jwtDecode(token);

  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setLoading(false);
  //   }
  // });

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
    // logout();
    // setOpenLoginModal(true);
    // Add any other logout logic here
  };
  // console.log(isLoggedIn);
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
          >
            {/* Add your navbar links here */}
          </Typography>

          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {userData.isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <strong>Profile</strong>
                </Link>
                <Button color="inherit" onClick={handleLogout}>
                  <strong>Logout</strong>
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={handleOpenSignupModal}>
                  <strong>Signup</strong>
                </Button>
                <Button color="inherit" onClick={handleOpenLoginModal}>
                  <strong>Login</strong>
                </Button>
              </>
            )}
          </Typography>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", sm: "none" } }}
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
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Profile
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={handleMenuClose}>
              {userData.isLoggedIn ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={handleOpenSignupModal}>
                  Signup
                </Button>
              )}
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              {userData.isLoggedIn ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={handleOpenLoginModal}>
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
