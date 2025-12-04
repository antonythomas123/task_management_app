import React, { useContext, useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import { signin } from "../utils/interceptor";
import { AuthContext } from "../contexts/AuthContext";

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

  const { login } = useContext(AuthContext);

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors({ ...errors, [name]: "" });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrors({ api_error: "" });

    let newErrors = {};

    if (!fields.email.trim()) {
      newErrors.email = "Field cannot be empty";
    }
    if (!fields.password.trim()) {
      newErrors.password = "Field cannot be empty";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = {
          email: fields?.email,
          password: fields?.password,
        };
        const res = await signin(payload);

        if (res) {
          login(res?.data?.user, res?.data?.token);
          navigate("/dashboard");
        }
      } catch (error) {
        setErrors({
          api_error: error?.response?.data?.message || "",
        });
      }
    }
  };

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
        onSubmit={handleSignIn}
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
          <CustomTextField
            name={"email"}
            placeholder={"johndoe@gmail.com"}
            value={fields?.email}
            onChange={handleChange}
            error={errors?.email}
          />
          <FormHelperText error={Boolean(errors?.email)}>
            {errors?.email}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <CustomTextField
            placeholder="••••••"
            type={"password"}
            name={"password"}
            value={fields?.password}
            error={errors?.password}
            onChange={handleChange}
          />
          <FormHelperText error={Boolean(errors?.password)}>
            {errors?.password}
          </FormHelperText>
        </FormControl>

        {errors?.api_error && (
          <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
            {errors?.api_error}
          </p>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
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
