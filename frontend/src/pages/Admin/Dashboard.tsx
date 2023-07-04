import {
  AnalyticsRounded,
  Inventory,
  Bookmark,
  ShoppingCart,
  AccountCircle,
} from "@mui/icons-material";
import { Box, Container, colors, useTheme } from "@mui/material";
import React, { useLayoutEffect } from "react";
import DashboardPart from "../../components/Admin/DashboardPart";
import isMobile from "is-mobile";
import useAdminAuth from "../../hooks/useAdminAuth";
export default function Dashboard({
  children,
}: {
  children: React.JSX.Element;
}) {
  const { VerifyToken } = useAdminAuth();
  useLayoutEffect(() => {
    VerifyToken();
  });
  const SideBarItems = [
    {
      title: "General",
      items: [
        {
          label: "Overview",
          icon: <AnalyticsRounded sx={{ color: colors.grey[500] }} />,
          path: "/admin",
        },
      ],
    },
    {
      title: "Content Management",
      items: [
        {
          label: "Products",
          icon: <Inventory sx={{ color: colors.grey[500] }} />,
          path: "/admin/product",
        },
        {
          label: "Catagories",
          icon: <Bookmark sx={{ color: colors.grey[500] }} />,
          path: "/admin/catagory",
        },
        {
          label: "Orders",
          icon: <ShoppingCart sx={{ color: colors.grey[500] }} />,
          path: "/admin/order",
        },
        {
          label: "Users",
          icon: <AccountCircle sx={{ color: colors.grey[500] }} />,
          path: "/admin/user",
        },
      ],
    },
  ];
  const Theme = useTheme();

  return (
    <DashboardPart items={SideBarItems}>
      {/* Dashboard Content */}
      <Box
        padding={Theme.spacing(isMobile() ? 0 : 2)}
        paddingTop={Theme.spacing(isMobile() ? 2 : 2)}
      >
        <Container maxWidth="xl" disableGutters>
          {children}
        </Container>
      </Box>
    </DashboardPart>
  );
}
