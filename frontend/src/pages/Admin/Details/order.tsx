import { useQuery } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";
import isMobile from "is-mobile";
import GetOrder from "../../../api/GetOrder";
import { ExpandCircleDown } from "@mui/icons-material";
import { SetName } from "../../../store/slice/Page";
import { LogOut } from "../../../store/slice/AdminAuthSlice";
import CalculateAmount from "../../../utils/CalculateAmount";
import api from "../../../api/API";
const availabilityString = ["Out Of Stock", "In Stock"];

const OrderDetails = () => {
  const { userId, orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    dispatch(SetName("Order Details"));
  });
  const Theme = useTheme();
  const auth = useSelector((state: RootState) => state.adminAuth.value);
  let { status, data } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => GetOrder(auth.accessToken, userId, orderId),
  });

  // refs

  const ProductIdElementRef = useRef<HTMLElement | null>(null);

  // States
  const [copied, SetCopied] = useState(false);
  const [Status, setStatus] = useState("Pending");

  const handleCloseSnakbar = (_, reason: string) => {
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
        navigate("/admin/order");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [Expanded, SetExpanded] = useState(true);
  useEffect(() => {
    setStatus(data?.status || "Pending");
  }, [data]);
  if (status == "loading") return <div>Loading...</div>;
  if (data == null) return navigate("/admin/order");
  if (status == "error") return navigate("/admin/order");
  data.products = data?.products.filter((product) => product.productId != null);

  return (
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
                  <TableCell align="right">Availability</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.products?.map((row, index) => (
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
                      {availabilityString[row.productId.availability]}
                    </TableCell>
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
                  <TableCell colSpan={3}>Subtotal</TableCell>
                  <TableCell align="right">
                    {data.amount.subTotal} {data.amount.currency.code}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>Tax + Delivery Fee</TableCell>
                  <TableCell align="right">
                    {data.amount.Tax}% + {data.amount.deliveryFee}{" "}
                    {data.amount.currency.code}
                  </TableCell>
                  <TableCell align="right">
                    {data.amount.addons} {data.amount.currency.code}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
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
        <Button onClick={() => navigate("/admin/order")} variant="outlined">
          Cancel
        </Button>
        <Button onClick={UpdateProductHandler} variant="contained">
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default OrderDetails;
