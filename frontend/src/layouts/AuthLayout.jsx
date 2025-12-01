import React from "react";
import { Outlet } from "react-router";
import { Box, styled } from "@mui/material";
import Navbar from "../components/Navbar";

const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: -1,

    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",

    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

function AuthLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        width: "100%",
      }}
    >
      <Navbar title="Task Manager" hideAvatar />

      <Container
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          pt: 4,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}

export default AuthLayout;
