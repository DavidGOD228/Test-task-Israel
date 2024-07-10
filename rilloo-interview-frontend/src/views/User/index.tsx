import React, { useContext } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import authContext from "../../context/Auth";

function User() {
  const { user } = useContext(authContext);

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">No user logged in</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      <Avatar
        alt="Profile Picture"
        src={user.profileUrl}
        sx={{ width: 150, height: 150, mb: 2 }}
      />
      <Typography variant="h6">
        <strong>Name:</strong> {user.name}
      </Typography>
      <Typography variant="h6">
        <strong>Email:</strong> {user.email}
      </Typography>
    </Box>
  );
}

export default User;
