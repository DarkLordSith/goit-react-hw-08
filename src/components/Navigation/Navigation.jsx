import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Button, Box } from "@mui/material";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

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

      {isLoggedIn && (
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
      )}
    </Box>
  );
};

export default Navigation;
