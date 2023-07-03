import React, { useState } from "react";
import {
  ClientMotionProps,
  ModalSlidDownMotionProps,
} from "../../utils/ConfigMotion";
import { motion } from "framer-motion";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ClientMenu from "../../components/Client/ClientMenu";
import useClientAuth from "../../hooks/useClientAuth";
import LoginModal from "../../components/Client/LoginModal";
import { useNavigate } from "react-router-dom";
import { Clear, Filter, SearchRounded } from "@mui/icons-material";
import CatagoryFilter from "../../components/Client/CatagoryFilter";
import PriceFilter from "../../components/Client/PriceFilter";
import ItemList from "../../components/Client/ItemList";
import FilterModal from "../../components/Client/FilterModal";
import RegisterModal from "../../components/Client/RegisterModal";
import SearchBar from "../../components/Client/SearchBar";
import isMobile from "is-mobile";
import FeaturedSwiperSection from "../../components/Client/FeaturedSwiperSection";
import CatagoriesSection from "../../components/Client/CatagoriesSection";
import ProductsSection from "../../components/Client/ProductsSection";
import Footer from "../../components/Client/Footer";

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{ paddingTop: "100px", minHeight: "100%" }}>
      <FeaturedSwiperSection />
      <CatagoriesSection />
      <ProductsSection title="Top Products" />
      <ProductsSection title="Newest Products" />
    </Container>
  );
};

export default Home;
