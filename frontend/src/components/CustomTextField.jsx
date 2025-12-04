import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({
  name,
  label,
  placeholder,
  type,
  multiline,
  minRows,
  value,
  onChange,
  error,
}) => {
  return (
    <TextField
      name={name}
      label={label}
      placeholder={placeholder}
      type={type}
      fullWidth
      multiline={multiline}
      minRows={minRows}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};

export default CustomTextField;
