import React, { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { SetName } from "../../store/slice/Page";
import type { RootState } from "../../store/Store";
import ToolbarContainer from "../../components/Admin/OrderToolbar";
import GetOrders from "../../api/GetOrders";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../store/slice/AdminAuthSlice";
import CalculateAmount from "../../utils/CalculateAmount";
import GetSettings from "../../api/GetSettings";

type Order = {
  _id: string;
  userId: string;
  amount: number;
  status: string;
  products: { productId: object; quantity: number }[];
  createdAt: string;
  updatedAt: string;
};
const OrderPage = () => {
  const auth = useSelector((state: RootState) => state.adminAuth.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(SetName("Orders"));
  });
  const { status, error, data } = useQuery({
    queryKey: ["order"],
    enabled: auth.accessToken != undefined,
    queryFn: () => GetOrders(auth.accessToken),
  });

  const Theme = useTheme();

  if (status == "loading") return <div>Loading...</div>;
  if (status == "error") return <div>loading...</div>;
  const rows =
    data && typeof data.map == "function"
      ? data?.map((order: Order) => {
          return {
            id: order._id,
            userId: order.userId,
            amount: order.amount,
            status: order.status,
            amount: order.amount.Total,
            createdAt: order.createdAt,
          };
        })
      : [];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
    },
    {
      field: "userId",
      headerName: "User ID",
      width: 250,
    },
    {
      field: "amount",
      headerName: "Total",
      width: 200,
    },
    {
      field: "status",
      headerName: "status",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
    },
  ];
  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: "100%",
      }}
    >
      <DataGrid
        sx={{
          border: 0,
          padding: Theme.spacing(2),
        }}
        onRowClick={(order) => {
          navigate(`/admin/order/${order.row.userId}/${order.id}`);
        }}
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        density="comfortable"
        pageSizeOptions={[10, 25, 50, 100]}
        slots={{
          toolbar: ToolbarContainer,
        }}
      ></DataGrid>
    </Paper>
  );
};

export default OrderPage;
