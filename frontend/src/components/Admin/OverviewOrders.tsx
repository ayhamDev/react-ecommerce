import moment from "moment";
import {
  Button,
  Card,
  CardHeader,
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
  // @ts-ignore
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
      <CardContent sx={{ overflowY: "auto", maxHeight: "500px" }}>
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
              // @ts-ignore

              const createdAt = moment(order.createdAt).format(
                "MMMM DD YYYY, h:mm a"
              );

              return (
                <TableRow
                  key={
                    // @ts-ignore

                    order.id
                  }
                >
                  <TableCell>
                    {
                      // @ts-ignore
                      order.ref
                    }
                  </TableCell>

                  <TableCell>
                    {
                      // @ts-ignore

                      order.customer.name
                    }
                  </TableCell>

                  <TableCell>{createdAt}</TableCell>
                  <TableCell>
                    {/* @ts-ignore */}
                    <SeverityPill color={statusMap[order.status]}>
                      {/* @ts-ignore */}
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
