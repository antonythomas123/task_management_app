import React from "react";
import CustomTextField from "../components/CustomTextField";
import { Link, useNavigate } from "react-router";
import {
  Box,
  Button,
  Card as MuiCard,
  Divider,
  FormControl,
  FormLabel,
  styled,
  Typography,
} from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <Typography
        component={"h1"}
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign In
      </Typography>

      <Box
        component={"form"}
        onSubmit={() => navigate("/dashboard")}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <CustomTextField name={"email"} placeholder={"johndoe@gmail.com"} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <CustomTextField placeholder="••••••" type={"password"} />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          //   onClick={validateInputs}
        >
          Sign in
        </Button>
      </Box>

      <Divider>or</Divider>

      <Typography sx={{ textAlign: "center" }}>
        Don&apos;t have an account?{" "}
        <Link to="/sign-up" sx={{ alignSelf: "center" }}>
          Sign up
        </Link>
      </Typography>
    </Card>
  );
};

export default SignIn;
