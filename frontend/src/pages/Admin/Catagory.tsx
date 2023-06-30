import { useQuery } from "@tanstack/react-query";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { SetName } from "../../store/slice/Page";

import ToolbarContainer from "../../components/Admin/CatagoryToolbar";
import GetCatagory from "../../api/GetCatagories";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../store/slice/AdminAuthSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import { RootState } from "../../store/Store";

type Catagory = {
  _id: string;
  name: string;
  updatedAt: string;
};
const CatagoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    dispatch(SetName("Catagories"));
  });
  const page = useSelector((state: RootState) => state.Page.value);

  const { status, error, data } = useQuery({
    queryKey: ["catagory"],
    queryFn: GetCatagory,
    onError: (err) => {
      if (err.response.status == 403) {
        dispatch(LogOut());
      }
    },
  });
  const Theme = useTheme();
  if (status == "loading") return <LoadingSpinner />;
  if (status == "error") return <LoadingSpinner />;
  const rows = data?.map((catagory: Catagory) => {
    return {
      id: catagory._id,
      name: catagory.name,
      updatedAt: catagory.updatedAt,
    };
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "updatedAt",
      headerName: "Last Update",
      width: 250,
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
          marginBottom: Theme.spacing(2),
        }}
      >
        <DataGrid
          sx={{
            border: 0,
            padding: Theme.spacing(2),
          }}
          onRowClick={(catagory) => {
            navigate(catagory.id);
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

export default CatagoryPage;
