import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "./ContextProvider/Context";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Tooltip,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  Avatar,
} from "@mui/material";

import { Logout } from "@mui/icons-material";
import AdbIcon from "@mui/icons-material/Adb";

const Navbar = () => {
  const navigate = useNavigate();

  const { logindata, setLoginData } = useContext(LoginContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 201) {
      console.log("use logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      navigate("/");
    } else {
      console.log("error");
    }
  };

  const goToDash = () => {
    navigate("/dashboard");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToAccount = () => {
    navigate("/account");
  };
  const goToSignup = () => {
    navigate("/register");
  };
  const goToSignin = () => {
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            

            {/*  Menu  will show  based on the condition  {ternary operator} */}
            {logindata.ValidUserOne ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 120 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => {
                      goToProfile();
                    }}
                  >
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      goToAccount();
                    }}
                  >
                    <Avatar /> My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      goToDash();
                    }}
                  >
                    <Avatar /> Dashboard
                  </MenuItem>
                  <Divider />

                  <MenuItem
                    onClick={() => {
                      logoutuser();
                      // goToHome();
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 120 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>top</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => {
                      goToSignin();
                    }}
                  >
                    <Avatar /> Sign In
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      goToSignup();
                    }}
                  >
                    <Avatar /> Sign Up
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
