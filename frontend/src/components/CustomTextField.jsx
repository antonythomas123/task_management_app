import { IconButton, InputAdornment, TextField } from "@mui/material";
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
  endIcon,
  onIconClick,
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
      autoComplete="off"
      inputProps={{ autoComplete: "off" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => onIconClick()}>{endIcon}</IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomTextField;
