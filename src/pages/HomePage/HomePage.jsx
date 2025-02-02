import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Card
        sx={{
          maxWidth: 500,
          p: 3,
          boxShadow: 5,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome to the Contact Book App!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your contacts securely and efficiently.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomePage;
