import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { SetName } from "../../store/slice/Page";
import type { RootState } from "../../store/Store";
import ToolbarContainer from "../../components/Admin/OrderToolbar";
import GetOrders from "../../api/GetOrders";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { motion } from "framer-motion";
import { AdminMotionProps } from "../../utils/ConfigMotion";
import useAdminAuth from "../../hooks/useAdminAuth";
import { SeverityPill } from "../../components/Admin/SeverityPill";
import statusMap from "../../utils/PillColors";
import moment from "moment";

type Order = {
  _id: string;
  userId: string;
  amount: {
    currency: {
      code: string;
    };
    Total: number;
  };
  status: string;
  products: { productId: object; quantity: number }[];
  createdAt: string;
  updatedAt: string;
};
const OrderPage = () => {
  const page = useSelector((state: RootState) => state.Page.value);

  const { VerifyToken, admin } = useAdminAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(SetName("Orders"));
    VerifyToken();
  });
  const { status, data } = useQuery({
    queryKey: ["order"],
    queryFn: () => GetOrders(admin?.accessToken),
  });

  const Theme = useTheme();

  if (status == "loading") return <LoadingSpinner />;
  if (status == "error") return <LoadingSpinner />;
  const rows =
    data && typeof data.map == "function"
      ? data?.map((order: Order) => {
          return {
            id: order._id,
            userId: order.userId,
            status: order.status,
            amount: `${order.amount.Total} ${order.amount.currency.code}`,
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
      headerName: "Status",
      width: 200,
      // @ts-ignore
      renderCell: (params: GridRenderCellParams) => (
        // @ts-ignore
        <SeverityPill color={statusMap[params.value]}>
          {params.value}
        </SeverityPill>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params: GridRenderCellParams<Date>) =>
        moment(params.value).format("MMMM DD YYYY, h:mm a"),
    },
  ];
  return (
    <motion.div {...AdminMotionProps}>
      <Typography variant="h5" paddingBottom={Theme.spacing(4)}>
        {page}
      </Typography>
      <Paper
        className="FancyBoxShadow"
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
          // @ts-ignore
          columns={columns}
          rows={rows}
          initialState={{
            sorting: {
              sortModel: [{ field: "createdAt", sort: "desc" }],
            },
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
    </motion.div>
  );
};

export default OrderPage;
