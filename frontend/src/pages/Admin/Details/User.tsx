import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store/Store";
import GetUser from "../../../api/GetUser";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Snackbar,
  Tooltip,
  IconButton,
} from "@mui/material";
import isMobile from "is-mobile";
import { SetName } from "../../../store/slice/Page";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { motion } from "framer-motion";
import { AdminMotionProps } from "../../../utils/ConfigMotion";
import useAdminAuth from "../../../hooks/useAdminAuth";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const Theme = useTheme();
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.Page.value);

  const { VerifyToken, admin } = useAdminAuth();
  const { status, data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => GetUser(admin.accessToken, id),
  });
  useLayoutEffect(() => {
    dispatch(SetName("User Details"));
    VerifyToken();
  });
  // refs
  const ProductIdElementRef = useRef<HTMLElement | null>(null);

  // States
  const [copied, SetCopied] = useState(false);

  const handleCloseSnakbar = (_: any, reason: string) => {
    if (reason === "clickaway") {
      return SetCopied(false);
    }
    if (reason == "timeout") {
      SetCopied(false);
    }
  };

  if (status == "error") return <Navigate to="/admin/user" replace />;
  if (status == "loading") return <LoadingSpinner />;
  if (data == null) return <Navigate to="/admin/user" replace />;
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
            navigate("/admin/user");
          }}
        >
          <ArrowBackIosNewRounded fontSize="medium" />
        </IconButton>
        <Typography variant="h5">{page}</Typography>
      </Box>
      <Paper
        elevation={2}
        sx={{
          minWidth: {
            xs: "260px",
            sm: "300px",
          },
          padding: isMobile() ? Theme.spacing(2) : Theme.spacing(4),
          flex: "1",
        }}
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
          <Box>User ID: </Box>
          <Box
            ref={ProductIdElementRef}
            onClick={async () => {
              navigator.clipboard
                // @ts-ignore

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
        <Box
          paddingY={Theme.spacing(2)}
          display={"flex"}
          gap={Theme.spacing(2)}
          flexDirection={"column"}
        >
          <Box>
            <Typography variant="subtitle1" color={"GrayText"}>
              Name:
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={(e) => {
                navigator.clipboard
                  // @ts-ignore
                  .writeText(e.currentTarget?.textContent)
                  .then(() => {
                    SetCopied(true);
                  });
              }}
              variant="h6"
            >
              {data.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color={"GrayText"}>
              Email:
            </Typography>
            <Tooltip title="Send Email To User" placement="top-start">
              <Box
                sx={{
                  textTransform: "initial",
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={() => {
                  open(`mailto:${data.email}","_blank`);
                }}
              >
                <Typography variant="h6">{data.email}</Typography>
              </Box>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="subtitle1" color={"GrayText"}>
              Phone Number:
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={(e) => {
                navigator.clipboard
                  // @ts-ignore
                  .writeText(e.currentTarget?.textContent)
                  .then(() => {
                    SetCopied(true);
                  });
              }}
              variant="h6"
            >
              {data.phoneNo}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color={"GrayText"}>
              Address:
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={(e) => {
                navigator.clipboard
                  // @ts-ignore
                  .writeText(e.currentTarget?.textContent)
                  .then(() => {
                    SetCopied(true);
                  });
              }}
              variant="h6"
            >
              {`${data.address.city}, ${data.address.lineOne}, ${data.address.lineTwo}`}
            </Typography>
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
    </motion.div>
  );
};

export default UserDetails;
