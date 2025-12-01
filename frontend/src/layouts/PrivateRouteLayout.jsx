import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { Box, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  height: "100%",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const PrivateRouteLayout = ({ children }) => {
  const isLoggedIn = true;

  const navigate = useNavigate();

  if (!isLoggedIn) return navigate("/sign-in");

  return (
    <>
      <Navbar title={"Task Management"} isLoggedIn={isLoggedIn}/>

      <Container>{children}</Container>
    </>
  );
};

export default PrivateRouteLayout;
