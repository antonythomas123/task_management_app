import React, { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ThemeSwitch from "./ThemeSwitch";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled("div")({
  position: "relative",
  height: 40,
  display: "flex",
  alignItems: "center",
  "& img": {
    maxHeight: 40,
  },
});

const Navbar = ({ logo, title, isLoggedIn = false }) => {
  const theme = useTheme();

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleAvatarClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    logout();
    navigate("/sign-in");
  };

  return (
    <AppBar color="inherit" position="absolute" sx={{ displayPrint: "none" }}>
      <Toolbar sx={{ backgroundColor: "inherit" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Stack direction="row" alignItems="center">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center">
                {logo ? <LogoContainer>{logo}</LogoContainer> : null}
                {title ? (
                  <Typography
                    variant="h6"
                    sx={{
                      color: (theme.vars ?? theme).palette.primary.main,
                      fontWeight: "700",
                      ml: 1,
                      whiteSpace: "nowrap",
                      lineHeight: 1,
                    }}
                  >
                    {title}
                  </Typography>
                ) : null}
              </Stack>
            </Link>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ marginLeft: "auto" }}
          >
            <Stack direction="row" alignItems="center" sx={{ gap: "16px" }}>
              <ThemeSwitch />

              {isLoggedIn && (
                <>
                  <IconButton onClick={(e) => handleAvatarClick(e)}>
                    <Avatar alt="" />
                  </IconButton>

                  <Menu
                    open={anchorElUser}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={() => setAnchorElUser(null)}
                  >
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
