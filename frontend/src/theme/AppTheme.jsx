import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { colorSchemes, typography, shadows, shape } from "./primitives";
import { formInputCustomizations } from "./customizations/formInput";

const AppTheme = ({ children }) => {
  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: "class",
      cssVarPrefix: "",
    },
    colorSchemes,
    typography,
    shadows, 
    shape,
    components: {
      ...formInputCustomizations
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
