import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import GetProducts from "../../api/GetProducts";
import { Paper, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import ToolbarContainer from "../../components/Admin/ProductToolbar";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { SetName } from "../../store/slice/Page";
import LoadingSpinner from "../../components/LoadingSpinner";
import GetSettings from "../../api/GetSettings";
import { RootState } from "../../store/Store";
import { motion } from "framer-motion";

import { AdminMotionProps } from "../../utils/ConfigMotion";
import useAdminAuth from "../../hooks/useAdminAuth";
import moment from "moment";
const availabilityString = ["Out Of Stock", "In Stock"];
type Product = {
  _id: string;
  title: string;
  catagory: { name: string };
  price: number;
  updatedAt: string;
  availability: number;
};
const Product = () => {
  const dispatch = useDispatch();
  const { VerifyToken } = useAdminAuth();
  useLayoutEffect(() => {
    dispatch(SetName("Products"));
    VerifyToken();
  });

  const { status: SettingsStatus, data: SettingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: GetSettings,
  });
  const { status, data } = useQuery({
    enabled: SettingsStatus == "success",
    queryKey: ["product"],
    queryFn: GetProducts,
  });

  const navigate = useNavigate();
  const Theme = useTheme();
  const page = useSelector((state: RootState) => state.Page.value);
  if (status == "loading") return <LoadingSpinner />;
  if (status == "error") return <LoadingSpinner />;
  if (SettingsStatus == "loading") return <LoadingSpinner />;
  if (SettingsStatus == "error") return <LoadingSpinner />;
  const rows = data?.map((product: Product) => {
    return {
      id: product._id,
      title: product.title,
      catagory: product.catagory.name,
      price: `${(product.price / 100).toFixed(2)} ${
        SettingsData?.currency.code
      }`,
      updatedAt: product.updatedAt,
      availability: availabilityString[product.availability],
    };
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
    },
    {
      field: "title",
      headerName: "Title",
      width: 220,
    },
    {
      field: "catagory",
      headerName: "Catagory",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 200,
      renderCell: (params: GridRenderCellParams<{ value: string }>) => (
        <Box
          sx={{
            paddingY: "10px",
            paddingX: "15px",
            bgcolor: Theme.palette.grey[200],
            borderRadius: "100px",
            fontWeight: "bold",
            cursor: "default",
            userSelect: "none",
            color:
              params.value == "In Stock"
                ? Theme.palette.success.main
                : Theme.palette.error.main,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Last Update",
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
          onRowClick={(product) => {
            navigate(`${product.id}`);
          }}
          sx={{
            border: "none",
            padding: Theme.spacing(2),
          }}
          // @ts-ignore
          columns={columns}
          rows={rows}
          initialState={{
            sorting: {
              sortModel: [{ field: "updatedAt", sort: "desc" }],
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

export default Product;
