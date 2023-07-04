import { useQuery } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../store/Store";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Snackbar,
  Button,
  Tooltip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import isMobile from "is-mobile";
import GetOrder from "../../../api/GetOrder";
import { ArrowBackIosNewRounded, ExpandCircleDown } from "@mui/icons-material";
import { SetName } from "../../../store/slice/Page";
import api from "../../../api/API";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { motion } from "framer-motion";
import { AdminMotionProps } from "../../../utils/ConfigMotion";
import useAdminAuth from "../../../hooks/useAdminAuth";

const OrderDetails = () => {
  const { userId, orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { VerifyToken, admin } = useAdminAuth();
  useLayoutEffect(() => {
    dispatch(SetName("Order Details"));
    VerifyToken();
  });
  const Theme = useTheme();
  const auth = useSelector((state: RootState) => state.adminAuth.value);
  const page = useSelector((state: RootState) => state.Page.value);
  const { status, data } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => GetOrder(admin.accessToken, userId, orderId),
  });

  // refs

  const ProductIdElementRef = useRef<HTMLElement | null>(null);

  // States
  const [copied, SetCopied] = useState<boolean>(false);
  const [Status, setStatus] = useState<string>("Pending");

  const [isUpdating, SetisUpdating] = useState<boolean>(false);

  const handleCloseSnakbar = (_: any, reason: string) => {
    if (reason === "clickaway") {
      return SetCopied(false);
    }
    if (reason == "timeout") {
      SetCopied(false);
    }
  };
  const StatusChangeHandler = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  const UpdateProductHandler = async () => {
    SetisUpdating(true);
    try {
      const res = await api.put(
        `/order/${orderId}/status`,
        {
          status: Status,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      if (res.status == 200) {
        SetisUpdating(false);
        navigate("/admin/order");
      }
    } catch (err) {
      SetisUpdating(false);
      console.log(err);
    }
  };

  const [Expanded, SetExpanded] = useState(true);
  useEffect(() => {
    setStatus(data?.status || "Pending");
  }, [data]);
  if (status == "error") return <Navigate to="/admin/order" replace />;
  if (status == "loading") return <LoadingSpinner />;
  if (data == null) return <Navigate to="/admin/order" replace />;

  data.products = data?.products.filter(
    (product: any) => product.productId != null
  );

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
            navigate("/admin/order");
          }}
        >
          <ArrowBackIosNewRounded fontSize="medium" />
        </IconButton>
        <Typography variant="h5">{page}</Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={Theme.spacing(2)}>
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
            <Box>Order ID: </Box>
            <Box
              ref={ProductIdElementRef}
              onClick={async () => {
                // @ts-ignore
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
              {orderId}
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
                User ID:
              </Typography>
              <Tooltip title="Go To User" placement="top">
                <Button
                  sx={{ textTransform: "initial" }}
                  onClick={() => {
                    navigate(`/admin/user/${data.userId}`);
                  }}
                >
                  <Typography variant="h6">{data.userId}</Typography>
                </Button>
              </Tooltip>
            </Box>
            <FormControl fullWidth required>
              <InputLabel id="select-catagory">Order Status</InputLabel>

              <Select
                labelId="select-catagory"
                id="catagory"
                label="Order Status"
                value={Status}
                onChange={StatusChangeHandler}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "200px",
                      overflowY: "auto",
                    },
                  },
                }}
                required
              >
                <MenuItem value={"Canceled"}>Canceled</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Accepted"}>Accepted</MenuItem>
                <MenuItem value={"Shipping"}>Shipping</MenuItem>
                <MenuItem value={"Delivered"}>Delivered</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Snackbar
            open={copied}
            message="Copied To Clipboard."
            autoHideDuration={3000}
            onClose={handleCloseSnakbar}
            onClick={() => SetCopied(false)}
          />
        </Paper>
        <Accordion
          expanded={Expanded}
          component={Paper}
          sx={{
            borderRadius: "10px",
            minWidth: {
              xs: "260px",
              sm: "300px",
            },
          }}
        >
          <AccordionSummary
            onClick={() => {
              SetExpanded(!Expanded);
            }}
            sx={{
              boxShadow: Theme.shadows["1"],
            }}
            expandIcon={<ExpandCircleDown />}
          >
            <Typography>Order Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.products?.map((row: any, index: any) => (
                    <TableRow
                      key={index}
                      sx={{
                        cursor: "pointer",
                        transition: ".3s",
                        ":hover": {
                          bgcolor: Theme.palette.grey[100],
                        },
                      }}
                      onClick={() => {
                        navigate(`/admin/product/${row?.productId._id}`);
                      }}
                    >
                      <TableCell>{row?.productId?.title}</TableCell>
                      <TableCell align="right">{row?.quantity}</TableCell>
                      <TableCell align="right">{row?.productId.unit}</TableCell>
                      <TableCell align="right">
                        {((row?.productId?.price * row.quantity) / 100).toFixed(
                          2
                        )}{" "}
                        {data.amount.currency.code}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">
                      {data.amount.subTotal} {data.amount.currency.code}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={1}>Tax + Delivery Fee</TableCell>
                    <TableCell align="right">
                      {data.amount.Tax}% + {data.amount.deliveryFee}{" "}
                      {data.amount.currency.code}
                    </TableCell>
                    <TableCell align="right">
                      {data.amount.addons} {data.amount.currency.code}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">
                      {data.amount.Total} {data.amount.currency.code}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Box
          width={"100%"}
          justifyContent={"end"}
          paddingY={Theme.spacing(3)}
          display={"flex"}
          gap={Theme.spacing(2)}
        >
          <Button
            disabled={isUpdating}
            onClick={() => navigate("/admin/order")}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            disabled={isUpdating}
            onClick={UpdateProductHandler}
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default OrderDetails;
