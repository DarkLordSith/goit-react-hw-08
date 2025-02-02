// src/components/AppBar/AppBar.jsx
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <MuiAppBar
      position="static"
      sx={{ backgroundColor: "primary.main", boxShadow: 3 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Contact Book
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
