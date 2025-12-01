import React from "react";
import {
  Box,
  Button,
  Grid,
  Pagination,
  styled,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { tasks } from "../data/tasks";
import moment from "moment";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router";

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
  const [page, setPage] = React.useState(1);

  const tasksPerPage = 9;

  const totalPages = Math.ceil(tasks?.length / tasksPerPage);
  const startIndex = (page - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const visibleTasks = tasks?.slice(startIndex, endIndex);

  const handleCreateClick = () => {
    navigate('/dashboard/new-task')
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
        {visibleTasks.map((task) => (
          <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TaskCard
              title={task.title}
              description={task.description}
              date={moment(task.created_date).format("DD MMMM YYYY")}
              status={task.status}
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
    </Box>
  );
};

export default Dashboard;
