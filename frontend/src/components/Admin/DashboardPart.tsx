import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";

import AvatarMenu from "./AvatarMenu";
import isMobile from "is-mobile";

import SidebarItem from "./SidebarItem";
import { Close } from "@mui/icons-material";
import { AppBar, colors, Drawer, Typography } from "@mui/material";
import niceBg from "../../assets/img/nice.png";
import { motion } from "framer-motion";
const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBarDesktop = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerDesktop = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  zIndex: 10,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard({
  children,
  items,
}: {
  children: JSX.Element;
  items: object[];
}) {
  const [ismobile, SetIsMobile] = React.useState(isMobile());
  const [open, setOpen] = React.useState(isMobile() ? false : true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleResize = () => {
    if (!ismobile && window.innerWidth < 800) {
      SetIsMobile(true);
    } else if (ismobile && window.innerWidth >= 800) {
      SetIsMobile(false);
    }
  };

  window.addEventListener("resize", handleResize);
  React.useEffect(() => {
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  React.useEffect(() => {
    handleResize();
  }, []);
  return (
    <motion.div
      style={{ height: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box sx={{ display: "flex", height: "100%" }}>
        {/* SideBar */}
        <CssBaseline />
        {ismobile ? (
          <AppBar
            variant="outlined"
            elevation={0}
            sx={{
              bgcolor: "rgb(255,255,255,0.70)",
              color: "black",
              zIndex: 9,
              backdropFilter: "blur(10px)",
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton
                sx={{ p: "10px", color: "#9e9e9e", mr: "5px" }}
                onClick={open ? handleDrawerClose : handleDrawerOpen}
              >
                {open ? (
                  <Close sx={{ color: "#9e9e9e" }} />
                ) : (
                  <Menu sx={{ color: "#9e9e9e" }} />
                )}
                {/* theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon /> */}
              </IconButton>
              <AvatarMenu />
            </Toolbar>
          </AppBar>
        ) : (
          <AppBarDesktop
            position="fixed"
            open={open}
            elevation={1}
            sx={{
              bgcolor: "rgb(255,255,255,0.70)",
              color: "black",
              zIndex: 9,
              backdropFilter: "blur(10px)",
            }}
          >
            <Toolbar
              sx={{
                justifyContent: "space-between",
                ml: !open ? (ismobile ? "55px" : "65px") : "-10px",
                transition: "0.5s all",
              }}
            >
              <IconButton
                sx={{ p: "10px", color: "#9e9e9e", mr: "5px" }}
                onClick={open ? handleDrawerClose : handleDrawerOpen}
              >
                {open ? (
                  <Close sx={{ color: "#9e9e9e" }} />
                ) : (
                  <Menu sx={{ color: "#9e9e9e" }} />
                )}
                {/* theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon /> */}
              </IconButton>
              <AvatarMenu />
            </Toolbar>
          </AppBarDesktop>
        )}

        {/* SideBar */}
        {ismobile ? (
          <Drawer
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            PaperProps={{
              sx: {
                width: "250px",
                zIndex: "999999",
                backgroundImage: `url(${niceBg})`,
                backgroundColor: "#222222",
              },
            }}
          >
            <DrawerHeader>
              <Typography variant="h6" color={colors.grey[200]}>
                {!open && !ismobile ? `Apx` : `Appexly`}
              </Typography>
            </DrawerHeader>
            <Box className="scrollbar">
              <List>
                {items.map((role, index) => (
                  <SidebarItem
                    key={index}
                    setOpen={setOpen}
                    // @ts-ignore
                    role={role}
                    open={open}
                    ismobile={ismobile}
                  />
                ))}
              </List>
            </Box>
          </Drawer>
        ) : (
          <DrawerDesktop
            PaperProps={{
              sx: {
                zIndex: "999999",
                backgroundImage: `url(${niceBg})`,
                backgroundColor: "#222222",
              },
            }}
            variant="permanent"
            open={open}
          >
            <DrawerHeader>
              <Typography variant="h6" color={colors.grey[200]}>
                {!open && !ismobile ? `AD` : `Admin Dashboard`}
              </Typography>
            </DrawerHeader>
            <Box className="scrollbar">
              <List>
                {items.map((role, index) => (
                  // @ts-ignore
                  <SidebarItem key={index} role={role} open={open} />
                ))}
              </List>
            </Box>
          </DrawerDesktop>
        )}

        {/* Main */}
        <Box
          className="scrollbar"
          component="main"
          sx={{
            flexGrow: 1,
            pt: "75px",
            pb: "5px",
            height: "100%",
            bgcolor: colors.grey[100],
          }}
        >
          <Box sx={{ px: "20px" }}>{children}</Box>
        </Box>
      </Box>
    </motion.div>
  );
}
