import {
  Box,
  Button,
  Dialog,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import isMobile from "is-mobile";
import { ModalSlidDownMotionProps } from "../../utils/ConfigMotion";
import { motion } from "framer-motion";
import useClientAuth from "../../hooks/useClientAuth";
import api from "../../api/API";

type ModalProps = {
  open: boolean;
  SetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const PaperWrapper = (props) => {
  return (
    <Paper
      sx={{
        margin: 2,
        maxWidth: "500px",
        width: "500px",
        minWidth: "auto",
      }}
    >
      {props.children}
    </Paper>
  );
};
const ModalMotion = (props) => {
  return (
    <motion.div style={{ height: "100%" }} {...ModalSlidDownMotionProps}>
      {props.children}
    </motion.div>
  );
};
const LoginModal = (props: ModalProps) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [Error, SetError] = useState(false);
  const { LogIn } = useClientAuth();
  const Theme = useTheme();
  const handleModalClose = () => {
    props.SetOpen(false);
  };
  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      emailRef.current?.value.length == 0 ||
      passwordRef.current?.value.length == 0
    )
      return SetError(true);
    try {
      SetError(false);
      const res = await api.post("/auth/login", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      LogIn(res.data);
      props.SetOpen(false);
    } catch (err) {
      SetError(true);
      console.log(err);
    }
  };
  return (
    <Dialog
      open={props.open}
      onClose={handleModalClose}
      PaperComponent={PaperWrapper}
      TransitionComponent={ModalMotion}
    >
      <Paper
        className="FancyBoxShadow"
        sx={{
          paddingX: Theme.spacing(isMobile() ? 2 : 4),
          paddingY: Theme.spacing(3),
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              width: "50px",
              height: "50px",
              bgcolor: "#e90d55",
              color: Theme.palette.grey[200],
              borderRadius: "100%",
            }}
          >
            <LockOutlined />
          </Box>
          <Typography
            paddingTop={Theme.spacing(2)}
            paddingBottom={Theme.spacing(3)}
            variant="h5"
          >
            LOG IN
          </Typography>
        </Box>
        <form onSubmit={HandleSubmit}>
          <Box gap={Theme.spacing(3)} display={"flex"} flexDirection={"column"}>
            <TextField
              id="email"
              inputRef={emailRef}
              name="email"
              type="email"
              label="E-mail"
              variant="outlined"
              autoFocus
              fullWidth
              required
            />
            <TextField
              id="password"
              inputRef={passwordRef}
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              required
              fullWidth
            />
            {Error ? (
              <Typography variant="body2" color={"red"}>
                Incorrect Email Or Password
              </Typography>
            ) : null}

            <Button type="submit" variant="contained" size="large">
              log in
            </Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  );
};

export default LoginModal;
