import React, { useState } from "react";
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
  FormHelperText,
  Snackbar,
} from "@mui/material";
import CustomTextField from "./CustomTextField";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { createTask } from "../utils/interceptor";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
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

  const [fields, setFields] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarContent, setSnackBarContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!fields.title.trim()) {
      newErrors.title = "Field cannot be empty";
    }
    if (!fields.description.trim()) {
      newErrors.description = "Field cannot be empty";
    }

    if (!fields.status.trim()) {
      newErrors.status = "Field cannnot be empty";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = {
          title: fields?.title || "",
          description: fields?.description || "",
          status: fields?.status || "",
        };

        const res = await createTask(payload);

        if (res) {
          setSnackBarContent("Task added successfully !");
          setOpenSnackbar(true);
          setFields({
            title: "",
            description: "",
            status: "",
          });
        }
      } catch (e) {
        console.log(e);
        setSnackBarContent("Task is not added. Please try again!");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Box sx={{ mt: 6, display: "flex", flexDirection: "column" }}>
      <Card>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Typography variant="h5">Add a new task</Typography>
          <Typography variant="h6">
            Fill out the form below to create a new task
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
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
              <Grid
                size={{ xs: 12, sm: 12 }}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <CustomTextField
                  label={"Title"}
                  name={"title"}
                  value={fields?.title}
                  onChange={handleChange}
                  error={errors?.title}
                />
                <FormHelperText error={Boolean(errors?.title)}>
                  {errors?.title}
                </FormHelperText>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 12 }}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <CustomTextField
                  label="Description"
                  multiline={true}
                  minRows={3}
                  name={"description"}
                  value={fields?.description}
                  onChange={handleChange}
                  error={errors?.description}
                />
                <FormHelperText error={Boolean(errors?.description)}>
                  {errors?.description}
                </FormHelperText>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 12 }}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <FormControl fullWidth>
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    value={fields?.status}
                    onChange={handleChange}
                    name="status"
                    error={errors?.status}
                  >
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText error={Boolean(errors?.status)}>
                  {errors?.status}
                </FormHelperText>
              </Grid>
            </Grid>
          </FormGroup>

          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <Button
              variant="outlined"
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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar((prev) => !prev)}
        message={snackBarContent}
        autoHideDuration={5000}
      />
    </Box>
  );
};

export default TaskForm;
