import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  SxProps,
  CardContent,
} from "@mui/material";
import { SeverityPill } from "./SeverityPill";
import { ArrowForwardIos } from "@mui/icons-material";
import statusMap from "../../utils/PillColors";
import { useNavigate } from "react-router-dom";
type OverviewOrdersProps = {
  orders: [];
  sx: SxProps;
};

export const OverviewOrders = (props: OverviewOrdersProps) => {
  const { orders = [], sx } = props;
  const navigate = useNavigate();
  return (
    <Card sx={sx}>
      <CardHeader
        title="Latest Orders"
        action={
          <Button
            onClick={() => {
              navigate("/admin/order");
            }}
            color="inherit"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowForwardIos />
              </SvgIcon>
            }
            size="small"
            variant="outlined"
          >
            View all
          </Button>
        }
      />
      <CardContent sx={{ overflowY: "auto", height: "fill" }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const createdAt = moment(order.createdAt).format(
                "MMMM DD YYYY, h:mm a"
              );

              return (
                <TableRow hover key={order.id}>
                  <TableCell>{order.ref}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{createdAt}</TableCell>
                  <TableCell>
                    <SeverityPill color={statusMap[order.status]}>
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
