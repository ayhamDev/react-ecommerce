import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetName } from "../../../store/slice/Page";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  useTheme,
  Snackbar,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import api from "../../../api/API";
import { RootState } from "../../../store/Store";
import { AdminMotionProps } from "../../../utils/ConfigMotion";
import { motion } from "framer-motion";
import useAdminAuth from "../../../hooks/useAdminAuth";
import { ArrowBackIosNewRounded } from "@mui/icons-material";

const CatagoryCreate = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { VerifyToken, admin } = useAdminAuth();
  useLayoutEffect(() => {
    dispacth(SetName("Create Catagory"));
    VerifyToken();
  });
  const Theme = useTheme();
  // States
  const [isUpdating, SetIsUpdating] = useState(false);

  const [copied, SetCopied] = useState(false);
  const [TitleState, SetTitleState] = useState<string>("");
  const [TitleError, SetTitleError] = useState<{
    error: boolean;
    text: string;
  }>({
    error: false,
    text: "",
  });
  const handleCloseSnakbar = (_: any, reason: string) => {
    if (reason === "clickaway") {
      return SetCopied(false);
    }
    if (reason == "timeout") {
      SetCopied(false);
    }
  };
  const CreateCataogyrHandler = async () => {
    SetIsUpdating(true);
    try {
      await api.post(
        `/catagory`,
        {
          name: TitleState,
        },
        {
          headers: {
            Authorization: `Bearer ${admin.accessToken}`,
          },
        }
      );
      SetIsUpdating(false);
      navigate("/admin/catagory");
    } catch (err) {
      SetIsUpdating(false);
      TitleState.length == 0
        ? SetTitleError({ error: true, text: "This Field Is Required" })
        : null;
    }
  };
  const page = useSelector((state: RootState) => state.Page.value);
  return (
    <motion.div {...AdminMotionProps}>
      <Box
        paddingBottom={Theme.spacing(4)}
        display={"flex"}
        alignItems={"center"}
        gap={Theme.spacing(2)}
      >
        <IconButton
          onClick={() => {
            navigate("/admin/catagory");
          }}
        >
          <ArrowBackIosNewRounded fontSize="medium" />
        </IconButton>
        <Typography variant="h5">{page}</Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={Theme.spacing(2)}
        flexWrap={"wrap"}
      >
        <Paper
          elevation={2}
          sx={{
            minWidth: {
              xs: "260px",
              sm: "300px",
            },
            padding: Theme.spacing(2),
            flex: "1",
          }}
        >
          <Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={Theme.spacing(4)}
            >
              <TextField
                id="titleRef"
                name="title"
                label="Name"
                variant="outlined"
                value={TitleState}
                onChange={(e) => SetTitleState(e.target.value)}
                autoFocus
                fullWidth
                required
                error={TitleError.error}
                helperText={TitleError.text}
              />
            </Box>
          </Box>
          <Snackbar
            open={copied}
            message="Copied To Clipboard."
            autoHideDuration={3000}
            onClose={handleCloseSnakbar}
            onClick={() => SetCopied(false)}
          />
        </Paper>
      </Box>
      <Box
        width={"100%"}
        justifyContent={"end"}
        paddingY={Theme.spacing(3)}
        display={"flex"}
        gap={Theme.spacing(2)}
      >
        <Button
          onClick={() => navigate("/admin/catagory")}
          variant="outlined"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button
          disabled={isUpdating}
          onClick={CreateCataogyrHandler}
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </motion.div>
  );
};

export default CatagoryCreate;
