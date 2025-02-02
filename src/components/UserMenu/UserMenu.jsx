import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser, selectIsLoggedIn } from "../../redux/auth/selectors";
import { Box, Typography, Button } from "@mui/material";
import { HiUser } from "react-icons/hi";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "primary.light",
        padding: "8px 16px",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {isLoggedIn ? (
        <>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
              fontWeight: 500,
            }}
          >
            <HiUser /> Welcome, {user.name}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </>
      ) : (
        <Typography variant="body1" color="white">
          Please log in
        </Typography>
      )}
    </Box>
  );
};

export default UserMenu;
