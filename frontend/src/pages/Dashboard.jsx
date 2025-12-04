import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Snackbar,
  styled,
  Typography,
  Modal,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import moment from "moment";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router";
import { deleteTask, getTasks } from "../utils/interceptor";

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: theme.spacing(2),
}));

const HeaderToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
  marginLeft: "auto",
}));

const Dashboard = () => {
  const navigate = useNavigate();

  const tasksPerPage = 9;

  const [page, setPage] = React.useState(1);
  const [tasks, setTasks] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);

  const [selectedId, setSelectedId] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleCreateClick = () => {
    navigate("/dashboard/new-task");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = (id) => {
    setOpenModal(true);
    setSelectedId(id);
  };
  const fetchTasksFromAPI = useCallback(async () => {
    return await getTasks({ page, limit: tasksPerPage });
  }, [page]);

  const handleRefreshAfterDelete = useCallback(async () => {
    try {
      const res = await fetchTasksFromAPI();
      setTasks(res?.data?.tasks);
      setTotalPages(res?.data?.pagination?.pages);
    } catch (err) {
      console.error("Error updating tasks:", err);
    }
  }, [fetchTasksFromAPI]);

  const handleDelete = async () => {
    try {
      setOpenModal(false)
      await deleteTask(selectedId);
      setOpenSnackbar(true);
      handleRefreshAfterDelete();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const res = await fetchTasksFromAPI();

        if (isMounted) {
          setTasks(res?.data?.tasks || []);
          setTotalPages(res?.data?.pagination?.pages || 1);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [fetchTasksFromAPI]);

  return (
    <Box sx={{ mt: 8 }}>
      <Header>
        <Typography variant="h4">{""}</Typography>
        <HeaderToolbar>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateClick}
          >
            Add New Task
          </Button>
        </HeaderToolbar>
      </Header>

      <Grid container spacing={2} sx={{ my: 2 }}>
        {tasks?.map((task) => (
          <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TaskCard
              id={task?._id}
              title={task.title}
              description={task.description}
              date={moment(task.created_date).format("DD MMMM YYYY")}
              status={task.status}
              onDeleteClick={(id) => handleDeleteClick(id)}
            />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
          />
        </Box>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar((prev) => !prev)}
        message={"Task Deleted Successfully!"}
        autoHideDuration={5000}
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            width: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Delete sx={{ color: "red", fontSize: 30 }} />

          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            Are you sure to delete this task ?
          </Typography>

          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ background: "red", color: "#FFFFFF" }}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
