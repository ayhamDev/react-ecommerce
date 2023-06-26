import { useQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch } from "react-redux";
import { SetName } from "../../store/slice/Page";

import ToolbarContainer from "../../components/Admin/CatagoryToolbar";
import GetCatagory from "../../api/GetCatagory";
import { useLayoutEffect } from "react";

type Catagory = {
  _id: string;
  name: string;
  updatedAt: string;
};
const CatagoryPage = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(SetName("Catagories"));
  });
  const { status, error, data } = useQuery({
    queryKey: ["catagory"],
    queryFn: GetCatagory,
  });
  const Theme = useTheme();
  if (status == "loading") return <div>Loading...</div>;
  if (status == "error") return <div>{JSON.stringify(error)}</div>;
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

export default CatagoryPage;
