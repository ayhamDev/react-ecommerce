import React, { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { SetName } from "../../store/slice/Page";
import type { RootState } from "../../store/Store";
import ToolbarContainer from "../../components/Admin/OrderToolbar";
import GetOrder from "../../api/GetOrder";

type Order = {
  _id: string;
  userId: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};
const OrderPage = () => {
  const auth = useSelector((state: RootState) => state.adminAuth.value);
  const dispacth = useDispatch();
  useLayoutEffect(() => {
    dispacth(SetName("Orders"));
  });
  const { status, error, data } = useQuery({
    queryKey: ["order"],
    enabled: auth.accessToken != undefined,
    queryFn: () => GetOrder(auth.accessToken),
  });
  const Theme = useTheme();
  if (status == "loading") return <div>Loading...</div>;
  if (status == "error") return <div>{JSON.stringify(error)}</div>;
  const rows = data?.map((order: Order) => {
    return {
      id: order._id,
      userId: order.userId,
      amount: order.amount,
      status: order.status,
      createdAt: order.updatedAt,
    };
  });

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
    <Paper elevation={2}>
      <DataGrid
        sx={{
          border: 0,
          padding: Theme.spacing(2),
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
