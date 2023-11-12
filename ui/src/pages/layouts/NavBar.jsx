/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";

import { logOut } from "../../services/userServices";

const navegationLinks = [
  {
    title: "Inicio",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Lista Reclamos",
    path: "/reclamos-lista",
    icon: <ChecklistIcon />,
  },
  {
    title: "Generar Reclamo",
    path: "/nuevo-reclamo",
    icon: <AddIcon />,
  },
];

const navegationLinksEmployee = [
  {
    title: "Lista Reclamos",
    path: "/reclamos-lista",
    icon: <ChecklistIcon />,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const isEmployee = JSON.parse(sessionStorage.getItem("userData")).userArea;

  async function handleLogOut() {
    try {
      const response = await logOut();
      if (response.status === 200) {
        sessionStorage.removeItem("userData");
        window.location.href = "http://localhost:3000/login";
      }
    } catch (error) {
      window.location.href = "http://localhost:3000/error";
    }
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "#ffffff",
              }}
            >
              +Crespo APP
            </Link>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isEmployee
              ? navegationLinksEmployee.map(item => (
                  <Button
                    color="inherit"
                    key={item.title}
                    component={NavLink}
                    to={item.path}
                  >
                    {item.title}
                  </Button>
                ))
              : navegationLinks.map(item => (
                  <Button
                    color="inherit"
                    key={item.title}
                    component={NavLink}
                    to={item.path}
                  >
                    {item.title}
                  </Button>
                ))}

            <Button color="inherit" onClick={() => handleLogOut()}>
              Cerrar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavListDrawer
          navegationLinks={
            isEmployee ? navegationLinksEmployee : navegationLinks
          }
          component={NavLink}
          setOpen={setOpen}
        />
      </Drawer>
    </>
  );
}
