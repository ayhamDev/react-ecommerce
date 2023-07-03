import { SearchRounded, Clear } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Typography,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import isMobile from "is-mobile";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  ModalSlidDownMotionProps,
  ClientMotionProps,
} from "../../utils/ConfigMotion";
import ClientMenu from "./ClientMenu";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import useClientAuth from "../../hooks/useClientAuth";
import FilterModal from "./FilterModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import CustomAppBar from "./CustomAppBar";

const HomeLayout = () => {
  const navigate = useNavigate();

  return (
    <Box height={"100%"} width={"100%"}>
      <CustomAppBar />
      <Outlet />;
      <Footer />
    </Box>
  );
};

export default HomeLayout;
