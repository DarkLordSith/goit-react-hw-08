import { NavLink } from "react-router-dom";
import { Button, Box } from "@mui/material";

const Navigation = () => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        component={NavLink}
        to="/"
        color="inherit"
        sx={{
          "&.active": {
            borderBottom: "2px solid white",
          },
        }}
      >
        Home
      </Button>
      <Button
        component={NavLink}
        to="/contacts"
        color="inherit"
        sx={{
          "&.active": {
            borderBottom: "2px solid white",
          },
        }}
      >
        Contacts
      </Button>
    </Box>
  );
};

export default Navigation;
