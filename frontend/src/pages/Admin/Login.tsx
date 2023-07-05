import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRef, useState, FormEvent, useLayoutEffect } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { SetName } from "../../store/slice/Page";
import { Login } from "../../store/slice/AdminAuthSlice";
import { motion } from "framer-motion";
import isMobile from "is-mobile";
import { AdminMotionProps } from "../../utils/ConfigMotion";

const LoginPage = () => {
  const Theme = useTheme();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(SetName("Admin Login"));
  });
  const [Error, SetError] = useState(undefined);
  const [isloading, SetIsloading] = useState(false);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetIsloading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/admin`, {
        email,
        password,
      })
      .then(function (response) {
        SetError(undefined);
        SetIsloading(false);

        dispatch(Login(response.data));
      })
      .catch(function (error) {
        SetIsloading(false);
        if (error.response?.data?.msg) return SetError(error.response.data.msg);
      });
  };
  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{ bgcolor: Theme.palette.grey[100] }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <motion.div
        {...AdminMotionProps}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          className="FancyBoxShadow"
          sx={{
            margin: Theme.spacing(2),
            paddingX: Theme.spacing(isMobile() ? 2 : 4),
            paddingY: Theme.spacing(3),
            width: "500px",
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
              <LockOutlinedIcon />
            </Box>
            <Typography
              paddingTop={Theme.spacing(2)}
              paddingBottom={Theme.spacing(3)}
              variant="h5"
            >
              ADMIN LOG IN
            </Typography>
          </Box>
          <form onSubmit={HandleSubmit}>
            <Box
              gap={Theme.spacing(3)}
              display={"flex"}
              flexDirection={"column"}
            >
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
                  {Error}
                </Typography>
              ) : null}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isloading}
              >
                {isloading ? <CircularProgress size={"28px"} /> : "Login"}
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
