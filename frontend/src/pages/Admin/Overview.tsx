import React, { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { AdminMotionProps } from "../../utils/ConfigMotion";
import { Box, useTheme } from "@mui/material";
import "chart.js/auto";
import useAdminAuth from "../../hooks/useAdminAuth";
const Overview = () => {
  const Theme = useTheme();

  const { VerifyToken } = useAdminAuth();
  useLayoutEffect(() => {
    VerifyToken();
  });
  return (
    <motion.div {...AdminMotionProps}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={Theme.spacing(4)}
      ></Box>
    </motion.div>
  );
};

export default Overview;
