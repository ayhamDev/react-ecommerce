import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SetName } from "../../store/slice/Page";
import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/Store";
import ToolbarContainer from "../../components/Admin/UserToolbar";
import GetUser from "../../api/GetUser";

type User = {
  _id: string;
  name: string;
  email: number;
  phoneNo: string;
};
const UserPage = () => {
  const auth = useSelector((state: RootState) => state.adminAuth.value);
  const dispacth = useDispatch();
  useLayoutEffect(() => {
    dispacth(SetName("Users"));
  });
  const { status, error, data } = useQuery({
    queryKey: ["user"],
    enabled: auth.accessToken != undefined,
    queryFn: () => GetUser(auth.accessToken),
  });
  const Theme = useTheme();
  if (status == "loading") return <div>Loading...</div>;
  if (status == "error") return <div>{JSON.stringify(error)}</div>;
  const rows = data?.map((user: User) => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNo: user.phoneNo,
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
      width: 250,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 250,
    },
    {
      field: "phoneNo",
      headerName: "Phone Number",
      width: 250,
    },
  ];
  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: "100%",
        marginBottom: Theme.spacing(2),
      }}
    >
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

export default UserPage;
