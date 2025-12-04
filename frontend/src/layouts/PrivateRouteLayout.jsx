import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Navigate, Outlet } from "react-router";
import { Box, styled } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

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

const PrivateRouteLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        width: "100%",
      }}
    >
      <Navbar title={"Task Management"} isLoggedIn={user ? true : false} />

      <Container
        sx={{
          flex: 1,
          px: 2,
          pt: 4,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default PrivateRouteLayout;
