import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRef } from "react";

const Login = () => {
  const Theme = useTheme();
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const HandleSubmit = (e: Event) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
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
      <Paper
        elevation={3}
        sx={{
          paddingX: Theme.spacing(4),
          paddingY: Theme.spacing(3),
          width: "400px",
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
            <Button type="submit" variant="contained">
              log in
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
