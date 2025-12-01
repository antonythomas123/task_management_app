import React from "react";
import {
  Box,
  styled,
  Typography,
  Card as MuiCard,
  Grid,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import CustomTextField from "./CustomTextField";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  border: "1px solid #e5e7eb",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    border: "1px solid #324467",
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const TaskForm = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: 6, display: "flex", flexDirection: "column", gap: "14px" }}>
    
      <Card>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Typography variant="h5">Add a new task</Typography>
          <Typography variant="h6">
            Fill out the form below to create a new task
          </Typography>
        </Box>

        <Box
          component="form"
          //   onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          //   onReset={handleReset}
          sx={{
            width: "100%",
            mt: 4,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <FormGroup>
            <Grid container spacing={6} sx={{ mb: 2, width: "100%" }}>
              <Grid size={{ xs: 12, sm: 12 }} sx={{ display: "flex" }}>
                <CustomTextField label={"Title"} />
              </Grid>
              <Grid size={{ xs: 12, sm: 12 }} sx={{ display: "flex" }}>
                <CustomTextField
                  label="Description"
                  multiline={true}
                  minRows={3}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12 }} sx={{ display: "flex" }}>
                <FormControl fullWidth>
                  <InputLabel id="status">Status</InputLabel>
                  <Select>
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </FormGroup>

          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/dashboard")}
            >
              Go Back
            </Button>

            <Button variant="contained" type="submit" size="large">
              Add
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default TaskForm;
