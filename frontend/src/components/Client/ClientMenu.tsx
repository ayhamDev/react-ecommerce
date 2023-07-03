import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  IconButton,
  Badge,
  Button,
  Stack,
  Avatar,
  colors,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountCircleRounded, ShoppingCartRounded } from "@mui/icons-material";
import useClientAuth from "../../hooks/useClientAuth";
import { ClientMotionProps } from "../../utils/ConfigMotion";
import { motion } from "framer-motion";
import isMobile from "is-mobile";

export default function ClientMenu(props: {
  src?: string;
  children?: string;
  auth: {
    User?: { name: string };
    accessToken?: string;
    isAuthenticated: boolean;
  };
  SetLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  SetRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    document.body.style.overflow = null;
  };
  const { LogOut } = useClientAuth();

  return (
    <motion.div {...ClientMotionProps}>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {props.auth.isAuthenticated ? (
            <Avatar sx={{ bgcolor: colors.deepOrange[500] }}>
              {props.auth.User?.name.substring(1, 0).toUpperCase()}
            </Avatar>
          ) : (
            <AccountCircleRounded fontSize={"large"} />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            navigate("/cart");
          }}
        >
          <Badge badgeContent={4} color="primary">
            <ShoppingCartRounded fontSize={"large"} />
          </Badge>
        </IconButton>
        <Menu
          elevation={2}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          onClick={() => {
            handleClose();
          }}
        >
          {props.auth.isAuthenticated ? (
            <>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/profile");
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/orders");
                }}
              >
                My Orders
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  LogOut();
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <Stack p={2} gap={2}>
              <Button
                variant="outlined"
                onClick={() => props.SetLoginModalOpen(true)}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => props.SetRegisterModalOpen(true)}
              >
                Register
              </Button>
            </Stack>
          )}
        </Menu>
      </Box>
    </motion.div>
  );
}
