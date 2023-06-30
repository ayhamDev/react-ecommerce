import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SetName } from "../../store/slice/Page";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/Store";
import ToolbarContainer from "../../components/Admin/UserToolbar";
import GetUsers from "../../api/GetUsers";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../store/slice/AdminAuthSlice";
import LoadingSpinner from "../../components/LoadingSpinner";

type User = {
  _id: string;
  name: string;
  email: number;
  phoneNo: string;
};
const UserPage = () => {
  const auth = useSelector((state: RootState) => state.adminAuth.value);
  const page = useSelector((state: RootState) => state.Page.value);

  const dispacth = useDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    dispacth(SetName("Users"));
  });
  const { status, error, data } = useQuery({
    queryKey: ["user"],
    enabled: auth.accessToken != undefined,
    queryFn: () => GetUsers(auth.accessToken),
  });
  const Theme = useTheme();
  if (status == "loading") return <LoadingSpinner />;
  if (status == "error") return <LoadingSpinner />;
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
    <>
      <Typography variant="h5" paddingBottom={Theme.spacing(4)}>
        {page}
      </Typography>
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
          onRowClick={(user) => {
            navigate(user.id);
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

export default UserPage;
