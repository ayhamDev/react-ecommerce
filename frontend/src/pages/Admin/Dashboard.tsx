import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import InventoryIcon from "@mui/icons-material/Inventory";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import isMobile from "is-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountCircle, Settings } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../../store/slice/AdminAuthSlice";
import { RootState } from "../../store/Store";
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactElement;
  window?: () => Window;
}

export default function Dashboard(props: Props) {
  const ListItems = [
    {
      text: "Overview",
      icon: <AnalyticsIcon />,
      path: "/admin",
    },
    {
      text: "Emails",
      icon: <EmailIcon />,
      path: "/admin/sendmail",
    },
  ];
  const CmsItems = [
    {
      text: "Products",
      icon: <InventoryIcon />,
      path: "/admin/cms/product",
    },
    {
      text: "Catagories",
      icon: <BookmarkIcon />,
      path: "/admin/cms/catagory",
    },
    {
      text: "Orders",
      icon: <ShoppingCartIcon />,
      path: "/admin/cms/order",
    },
    {
      text: "Users",
      icon: <AccountCircleIcon />,
      path: "/admin/cms/user",
    },
  ];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const route = useLocation();
  const theme = useTheme();
  const RouteName = useSelector((state: RootState) => state.Page.value);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h5">Dashboard</Typography>
      </Toolbar>
      <Typography
        variant="body2"
        paddingTop={theme.spacing(2)}
        paddingLeft={theme.spacing(2)}
      >
        General
      </Typography>
      <List>
        {ListItems.map((item, index) => (
          <ListItem
            sx={{
              bgcolor:
                route.pathname == item.path ? theme.palette.grey[300] : "",
            }}
            key={index}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography
        variant="body2"
        paddingTop={theme.spacing(2)}
        paddingLeft={theme.spacing(2)}
      >
        Content Mangment
      </Typography>
      <List>
        {CmsItems.map((item, index) => (
          <ListItem
            sx={{
              bgcolor:
                route.pathname == item.path ? theme.palette.grey[300] : "",
            }}
            key={index}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        variant={isMobile() ? "elevation" : "outlined"}
        elevation={isMobile() ? 2 : 0}
        sx={{
          bgcolor: "white",
          color: "GrayText",
          width: { sm: `calc(100% - ${drawerWidth - 1}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {RouteName}
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" color="disabled" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose;
                  dispatch(LogOut());
                }}
              >
                LogOut
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          transitionDuration={{ enter: 300, exit: 200 }}
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
        <Drawer
          variant="permanent"
          elevation={8}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          bgcolor: "#f3f3f3",
          flexGrow: 1,
          p: 3,
          maxWidth: "100%",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100%",
        }}
      >
        <Toolbar />

        {props.children}
      </Box>
    </Box>
  );
}
