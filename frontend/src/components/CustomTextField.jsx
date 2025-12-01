import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({ name, label, placeholder, type }) => {
  return (
    <TextField
      name={name}
      label={label}
      placeholder={placeholder}
      type={type}
      fullWidth
    />
  );
};

export default CustomTextField;
