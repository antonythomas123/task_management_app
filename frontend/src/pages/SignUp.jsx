import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomTextField from "../components/CustomTextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link, useNavigate } from "react-router";
import { FormHelperText } from "@mui/material";
import { signup } from "../utils/interceptor";
import { AuthContext } from "../contexts/AuthContext";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

function SignUp() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const [fields, setFields] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    api_error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors({ api_error: "" });

    let newErrors = {};

    if (!fields.fullname.trim()) {
      newErrors.fullname = "Field cannot be empty";
    }
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
          name: fields?.fullname,
          email: fields?.email,
          password: fields?.password,
        };

        const res = await signup(payload);
        if (res) {
          login(res?.data?.user, res?.data?.token);
          navigate("/dashboard");
        }
      } catch (error) {
        setFields({
          fullname: "",
          email: "",
          password: "",
        });
        setErrors({
          api_error: error?.response?.data?.message || "",
        });
      }
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={(e) => handleSignUp(e)}
      >
        <FormControl>
          <FormLabel htmlFor="fullname">Full Name</FormLabel>
          <CustomTextField
            placeholder={"Jon Snow"}
            value={fields?.fullname}
            name={"fullname"}
            onChange={handleChange}
            error={errors?.fullname}
          />
          <FormHelperText error={Boolean(errors?.fullname)}>
            {errors?.fullname}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <CustomTextField
            placeholder={"johndoe@gmail.com"}
            value={fields?.email}
            onChange={handleChange}
            name={"email"}
            error={errors?.email}
          />
          <FormHelperText error={Boolean(errors?.email)}>
            {errors?.email}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Password</FormLabel>
          <CustomTextField
            placeholder="••••••"
            name={"password"}
            onChange={handleChange}
            value={fields?.password}
            error={errors?.password}
            type={"password"}
          />
          <FormHelperText error={Boolean(errors?.password)}>
            {errors?.password}
          </FormHelperText>
        </FormControl>

        {errors?.api_error && (
          <p style={{ color: "red", fontSize: "12px", textAlign: 'center' }}>{errors?.api_error}</p>
        )}

        <Button type="submit" fullWidth variant="contained">
          Sign up
        </Button>
      </Box>
      <Divider>
        <Typography sx={{ color: "text.secondary" }}>or</Typography>
      </Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/sign-in" variant="body2" sx={{ alignSelf: "center" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}

export default SignUp;
