import { useQuery } from "@tanstack/react-query";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { SetName } from "../../store/slice/Page";

import ToolbarContainer from "../../components/Admin/CatagoryToolbar";
import GetCatagory from "../../api/GetCatagories";
import { useLayoutEffect } from "react";

import LoadingSpinner from "../../components/LoadingSpinner";
import { RootState } from "../../store/Store";
import { motion } from "framer-motion";
import { AdminMotionProps } from "../../utils/ConfigMotion";
import useAdminAuth from "../../hooks/useAdminAuth";
import moment from "moment";
import { useNavigate } from "react-router-dom";

type Item = { catagory: Catagory };
type Catagory = {
  _id: string;
  name: string;
  updatedAt: string;
};
const CatagoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { VerifyToken } = useAdminAuth();
  useLayoutEffect(() => {
    dispatch(SetName("Catagories"));
    VerifyToken();
  });
  const page = useSelector((state: RootState) => state.Page.value);

  const { status, data } = useQuery({
    queryKey: ["catagory"],
    queryFn: GetCatagory,
  });
  const Theme = useTheme();
  if (status == "loading") return <LoadingSpinner />;
  if (status == "error") return <LoadingSpinner />;
  const rows = data?.map((item: Item) => {
    return {
      id: item.catagory._id,
      name: item.catagory.name,
      updatedAt: item.catagory.updatedAt,
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
          marginBottom: Theme.spacing(2),
        }}
      >
        <DataGrid
          sx={{
            border: 0,
            padding: Theme.spacing(2),
          }}
          onRowClick={(catagory) => {
            navigate(`${catagory.id}`);
          }}
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

export default CatagoryPage;
