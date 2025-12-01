import { alpha } from "@mui/material/styles";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { formHelperTextClasses } from "@mui/material/FormHelperText";
import { iconButtonClasses } from "@mui/material/IconButton";
import { brand } from "../../theme/primitives";

export const formInputCustomizations = {
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
      fullWidth: true,
    },
  },

  MuiFormControl: {
    styleOverrides: {
      root: ({ theme }) => ({
        position: "relative",
        [`& .${outlinedInputClasses.root}`]: {
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
          borderRadius: 8,
          padding: "0px !important",
          background: "transparent",

          "&:hover": {
            borderColor: brand[400],
          },

          [`&.Mui-focused`]: {
            borderColor: brand[400],
            outline: `3px solid ${alpha(brand[500], 0.32)}`,
          },

          [`& .${outlinedInputClasses.notchedOutline}`]: {
            border: "none !important",
          },

          "& textarea": {
            padding: "12px !important",
          },
        },

        [`& .${inputLabelClasses.root}`]: {
          fontSize: "20px",
          transform: "translate(4px, -24px) scale(0.75)",

          [`&.Mui-focused`]: {
            transform: "translate(4px, -24px) scale(0.75)",
          },
        },

        [`& .${inputBaseClasses.input}`]: {
          padding: "12px",
          fontSize: theme.typography.pxToRem(15),
        },

        [`& .${formHelperTextClasses.root}`]: {
          marginLeft: 2,
        },

        "& .MuiPickersInputBase-root": {
          marginTop: 6,
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
          borderRadius: 8,
          padding: "0px !important",

          backgroundColor: "transparent",

          " .MuiPickersOutlinedInput-notchedOutline": {
            border: "none",
          },

          " .MuiPickersInputBase-sectionsContainer": {
            padding: "10px 0",
          },

          [`&.Mui-focused`]: {
            border: `1px solid ${(theme.vars || theme).palette.divider}`,
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            borderColor: brand[400],

            " .MuiPickersOutlinedInput-notchedOutline": {
              border: "none",
            },
          },

          [` .${iconButtonClasses.root}`]: {
            height: "34px",
            width: "34px",
            border: "none",
          },
        },
      }),
    },
  },
};
