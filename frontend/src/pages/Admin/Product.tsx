import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import GetProducts from "../../api/GetProducts";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import ToolbarContainer from "../../components/Admin/ProductToolbar";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { SetName } from "../../store/slice/Page";
import { LogOut } from "../../store/slice/AdminAuthSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import GetSettings from "../../api/GetSettings";
import { RootState } from "../../store/Store";
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
  useLayoutEffect(() => {
    dispatch(SetName("Products"));
  });

  const auth = useSelector((state: RootState) => state.adminAuth.value);
  const { status: SettingsStatus, data: SettingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: () => GetSettings(auth.accessToken),
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
      width: 150,
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 200,
    },
    {
      field: "updatedAt",
      headerName: "Last Update",
      width: 200,
    },
  ];
  return (
    <>
      <Typography variant="h5" paddingBottom={Theme.spacing(4)}>
        {page}
      </Typography>
      <Paper
        elevation={2}
        sx={{
          maxWidth: "100%",
        }}
      >
        <DataGrid
          onRowClick={(product) => {
            navigate(product.id);
          }}
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
    </>
  );
};

export default Product;
