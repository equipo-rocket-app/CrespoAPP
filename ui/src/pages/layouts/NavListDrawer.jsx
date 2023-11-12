import React from "react";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/system";
import { logOut } from "../../services/userServices";

export default function NavListDrawer({ navegationLinks, component, setOpen }) {
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
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          {navegationLinks.map(item => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton
                component={component}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLogOut()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Cerrar Sesión</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
