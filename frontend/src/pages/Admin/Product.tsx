import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import GetProducts from "../../api/GetProducts";
import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import ToolbarContainer from "../../components/Admin/ProductToolbar";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { SetName } from "../../store/slice/Page";
type Product = {
  _id: string;
  title: string;
  catagory: { name: string };
  price: number;
  updatedAt: string;
};
const Product = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(SetName("Products"));
  });
  const { status, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: GetProducts,
  });
  const navigate = useNavigate();
  const Theme = useTheme();
  if (status == "loading") return <div>Loading...</div>;
  if (status == "error") return <div>{JSON.stringify(error)}</div>;
  const rows = data?.map((product: Product) => {
    return {
      id: product._id,
      title: product.title,
      catagory: product.catagory.name,
      price: product.price,
      updatedAt: product.updatedAt,
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
      field: "updatedAt",
      headerName: "Last Update",
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
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        density="comfortable"
        pageSizeOptions={[5, 10, 25, 50, 100]}
        slots={{
          toolbar: ToolbarContainer,
        }}
      ></DataGrid>
    </Paper>
  );
};

export default Product;
