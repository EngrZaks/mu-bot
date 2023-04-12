import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "./assets/logo.png";
import Chat from "./components/Chat";

import { HashRouter as Router, Route, Link } from "react-router-dom";
import About from "./components/About";
import Contacts from "./components/Contacts";
import { Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

interface Props {
  children: React.ReactElement;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function HideOnScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUBot
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link to={item == "Home" ? "/" : item}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HideOnScroll>
          <AppBar component="nav" color="default">
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <img src={logo} alt="MU logo" height={50} width={45} />
              <Typography
                variant="h6"
                component="div"
                // sx={{ flexGrow: 1, display: "block" }}
              >
                MUBot
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <Button key={item} sx={{ color: "#000" }}>
                    <Link to={item == "Home" ? "/" : item}>{item}</Link>
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Box component="nav">
          <Drawer
            color="red"
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main">
          <Toolbar />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contacts />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
