import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { AdminMotionProps } from "../../utils/ConfigMotion";
import { Grid, Typography, useTheme } from "@mui/material";
import "chart.js/auto";
import useAdminAuth from "../../hooks/useAdminAuth";
import { OverviewItemStatus } from "../../components/Admin/OverviewItemStatus";
import {
  AccountCircleRounded,
  Inventory2Rounded,
  MonetizationOnRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { OverviewSales } from "../../components/Admin/OverviewSales";
import { OverviewStatus } from "../../components/Admin/OverviewStatus";
import OverviewProducts from "../../components/Admin/OverviewCustomers";
import { OverviewOrders } from "../../components/Admin/OverviewOrders";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { SetName } from "../../store/slice/Page";
const Overview = () => {
  const Theme = useTheme();
  const dispatch = useDispatch();
  useLayoutEffect(() => {});
  const page = useSelector((state: RootState) => state.Page.value);
  const { VerifyToken } = useAdminAuth();
  useLayoutEffect(() => {
    dispatch(SetName("Overview"));
    VerifyToken();
  });
  return (
    <motion.div {...AdminMotionProps}>
      <Typography variant="h5" paddingBottom={Theme.spacing(4)}>
        {page}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <OverviewItemStatus
            title="TOTAL INCOME"
            Icon={MonetizationOnRounded}
            iconColor="error.main"
            difference={12}
            positive
            sx={{ height: "100%" }}
            value="$24k"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <OverviewItemStatus
            title="TOTAL ORDERS"
            Icon={ShoppingCartRounded}
            iconColor="warning.main"
            difference={12}
            positive
            sx={{ height: "100%" }}
            value="45k"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <OverviewItemStatus
            title="TOTAL CUSTOMERS"
            Icon={AccountCircleRounded}
            iconColor="success.main"
            difference={12}
            positive
            sx={{ height: "100%" }}
            value="45k"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <OverviewItemStatus
            title="TOTAL PRODUCTS"
            Icon={Inventory2Rounded}
            iconColor="info.main"
            sx={{ height: "100%" }}
            value="45k"
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <OverviewSales
            // @ts-ignore
            chartSeries={[
              {
                name: "This year",
                data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
              },
              {
                name: "Last year",
                data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
              },
            ]}
            sx={{ height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OverviewStatus
            chartSeries={[63, 15]}
            labels={["Pending", "Delivered"]}
            sx={{ height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OverviewProducts />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <OverviewOrders
            // @ts-ignore
            orders={[
              {
                id: "f69f88012978187a6c12897f",
                ref: "DEV1049",
                amount: 30.5,
                customer: {
                  name: "Ekaterina Tankova",
                },
                createdAt: 1555016400000,
                status: "Canceled",
              },
              {
                id: "f69f88012978187a6c12897f",
                ref: "DEV1049",
                amount: 30.5,
                customer: {
                  name: "Ekaterina Tankova",
                },
                createdAt: 1555016400000,
                status: "Pending",
              },
              {
                id: "f69f88012978187a6c12897f",
                ref: "DEV1049",
                amount: 30.5,
                customer: {
                  name: "Ekaterina Tankova",
                },
                createdAt: 1555016400000,
                status: "Accepted",
              },
              {
                id: "f69f88012978187a6c12897f",
                ref: "DEV1049",
                amount: 30.5,
                customer: {
                  name: "Ekaterina Tankova",
                },
                createdAt: 1555016400000,
                status: "Shipping",
              },
              {
                id: "f69f88012978187a6c12897f",
                ref: "DEV1049",
                amount: 30.5,
                customer: {
                  name: "Ekaterina Tankova",
                },
                createdAt: 1555016400000,
                status: "Delivered",
              },
            ]}
            sx={{ height: "100%" }}
          />
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Overview;
