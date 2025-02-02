import { NavLink } from "react-router-dom";
import { Button, Box } from "@mui/material";

const AuthNav = () => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        component={NavLink}
        to="/register"
        variant="outlined"
        color="inherit"
        sx={{
          "&.active": {
            backgroundColor: "secondary.main",
            color: "white",
          },
        }}
      >
        Register
      </Button>
      <Button
        component={NavLink}
        to="/login"
        variant="outlined"
        color="inherit"
        sx={{
          "&.active": {
            backgroundColor: "secondary.main",
            color: "white",
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default AuthNav;
