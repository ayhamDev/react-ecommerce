import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import GetCatagory from "../../../api/GetCatagory";
import { useSelector } from "react-redux";
import api from "../../../api/API";
import { RootState } from "../../../store/Store";

const CatagoryDetails = () => {
  const { id } = useParams();
  const dispacth = useDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    dispacth(SetName("Product Details"));
  });
  const FileTypes = ["image/png", "image/jpg", "image/jpeg"];

  // Redux
  const auth = useSelector((state: RootState) => state.adminAuth.value);

  const Theme = useTheme();
  // Refs
  const ProductIdElementRef = useRef<HTMLElement | null>(null);
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
  // Quarys
  const { data, status } = useQuery({
    queryKey: ["catagory", id],
    queryFn: () => GetCatagory(id),
  });

  const handleCloseSnakbar = (_, reason: string) => {
    if (reason === "clickaway") {
      return SetCopied(false);
    }
    if (reason == "timeout") {
      SetCopied(false);
    }
  };
  const DeleteCataogyrHandler = async () => {
    try {
      await api.delete(`/catagory/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      navigate("/admin/catagory");
    } catch (err) {
      TitleState.length == 0
        ? SetTitleError({ error: true, text: "This Field Is Required" })
        : null;
    }
  };
  const UpdateCataogyrHandler = async () => {
    try {
      await api.put(
        `/catagory/${id}`,
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

  useEffect(() => {
    SetTitleState(data?.name);
  }, [data]);

  if (status == "loading") return <div>loading...</div>;
  if (data == null) return navigate("/admin/catagory");
  if (status == "error") return navigate("/admin/catagory");
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
              <Typography
                variant="h6"
                component={"h6"}
                display={"flex"}
                alignItems={"center"}
                flexWrap={"wrap"}
                sx={{
                  fontSize: {
                    xs: "0.85rem",
                    md: "1.25rem",
                  },
                  justifyContent: {
                    xs: "center",
                    md: "start",
                  },
                }}
              >
                <Box>Product ID: </Box>
                <Box
                  ref={ProductIdElementRef}
                  onClick={async () => {
                    navigator.clipboard
                      .writeText(ProductIdElementRef.current?.textContent)
                      .then(() => {
                        SetCopied(true);
                      });
                  }}
                  sx={{
                    userSelect: "none",
                    cursor: "pointer",
                    marginLeft: Theme.spacing(1),
                    paddingX: Theme.spacing(2),
                    paddingY: Theme.spacing(1),
                    bgcolor: Theme.palette.grey[300],
                    borderRadius: "24px",
                  }}
                >
                  {id}
                </Box>
              </Typography>
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
          onClick={DeleteCataogyrHandler}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
        <Button onClick={UpdateCataogyrHandler} variant="contained">
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default CatagoryDetails;
