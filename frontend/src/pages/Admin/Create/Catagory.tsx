import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { SetName } from "../../../store/slice/Page";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import api from "../../../api/API";
import { RootState } from "../../../store/Store";

const CatagoryCreate = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    dispacth(SetName("Product Details"));
  });

  // Redux
  const auth = useSelector((state: RootState) => state.adminAuth.value);

  const Theme = useTheme();
  // Refs
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
  const handleCloseSnakbar = (_, reason: string) => {
    if (reason === "clickaway") {
      return SetCopied(false);
    }
    if (reason == "timeout") {
      SetCopied(false);
    }
  };
  const CreateCataogyrHandler = async () => {
    try {
      await api.post(
        `/catagory`,
        {
          name: TitleState,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      navigate("/admin/catagory");
    } catch (err) {
      TitleState.length == 0
        ? SetTitleError({ error: true, text: "This Field Is Required" })
        : null;
    }
  };

  return (
    <Box>
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
        <Button onClick={CreateCataogyrHandler} variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CatagoryCreate;
