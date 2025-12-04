import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Pagination,
  styled,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import moment from "moment";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router";
import { getTasks } from "../utils/interceptor";

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

  const handleCreateClick = () => {
    navigate("/dashboard/new-task");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    let isMounted = true;

    const getAllTasks = async () => {
      try {
        const res = await getTasks({ page, limit: tasksPerPage });

        if (isMounted) {
          setTasks(res?.data?.tasks);
          setTotalPages(res?.data?.pagination?.pages);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getAllTasks();

    return () => {
      isMounted = false;
    };
  }, [page]);

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
