import React from "react";
import { styled, Card as MuiCard, Chip, Box } from "@mui/material";
import { CalendarToday, Edit, Delete } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  border: "1px solid #e5e7eb",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    border: "1px solid #324467",
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const CardHeader = styled(Box)(({ theme }) => ({
  background: "#FFFFFF",
  borderBottom: "1px solid #e5e7eb",
  ...theme.applyStyles("dark", {
    background: "#192233",
    borderBottom: "1px solid #324467",
  }),
}));

export const StatusChip = styled(Chip)(({ theme, status }) => ({
  color: status === "PENDING" ? "#92400e !important" : "#065f46 !important",
  backgroundColor:
    status === "PENDING"
      ? "#fef3c7 !important"
      : status === "COMPLETED"
      ? "#d1fae5 !important"
      : "#1e40af",
  fontWeight: 600,
  ...theme.applyStyles("dark", {
    color: status === "PENDING" ? "#fcd34d !important" : "#a7f3d0 !important",
    backgroundColor:
      status === "PENDING"
        ? "#78350f !important"
        : status === "COMPLETED"
        ? "#064e3b !important"
        : "",
  }),
}));

function TaskCard({ title, description, date, status }) {
  return (
    <Card>
      <CardHeader sx={{ padding: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>

          <StatusChip label={status} status={status} />
        </Box>

        <Typography
          variant="body2"
          // sx={{ color: "rgba(255,255,255,0.6)", lineHeight: "22px" }}
        >
          {description}
        </Typography>
      </CardHeader>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
        sx={{ padding: 2 }}
      >
        <Box display="flex" alignItems="center">
          <CalendarToday sx={{ fontSize: 16, color: "#94a3b8" }} />
          <Typography
            variant="body2"
            sx={{
              ml: 1,
              // color: "#94a3b8"
            }}
          >
            {date}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton size="small" sx={{ color: "#94a3b8" }}>
            <Edit fontSize="small" />
          </IconButton>

          <IconButton size="small" sx={{ color: "#ef4444" }}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

export default TaskCard;
