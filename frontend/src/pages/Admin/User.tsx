import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SetName } from "../../store/slice/Page";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/Store";
import ToolbarContainer from "../../components/Admin/UserToolbar";
import GetUsers from "../../api/GetUsers";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { motion } from "framer-motion";
import { AdminMotionProps } from "../../utils/ConfigMotion";
import useAdminAuth from "../../hooks/useAdminAuth";
import moment from "moment";

type User = {
  _id: string;
  name: string;
  email: number;
  phoneNo: string;
  createdAt: Date;
};
const UserPage = () => {
  const page = useSelector((state: RootState) => state.Page.value);
  const { VerifyToken, admin } = useAdminAuth();
  const dispacth = useDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    dispacth(SetName("Users"));
    VerifyToken();
  });
  const { status, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => GetUsers(admin.accessToken),
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
      createdAt: user.createdAt,
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
    {
      field: "createdAt",
      headerName: "Registered At",
      width: 250,
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
          marginBottom: Theme.spacing(2),
        }}
      >
        <DataGrid
          sx={{
            border: 0,
            padding: Theme.spacing(2),
          }}
          onRowClick={(user) => {
            navigate(`${user.id}`);
          }}
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

export default UserPage;
