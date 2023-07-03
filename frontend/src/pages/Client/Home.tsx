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

const Home = () => {
  const { auth } = useClientAuth();
  const [LoginModalOpen, SetLoginModalOpen] = useState(false);
  const [FilterModalOpen, SetFilterModalOpen] = useState(false);
  const [RegisetModalOpen, SetRegisetModalOpen] = useState(false);
  const [SearchValue, SetSearchValue] = useState(``);
  const [ismobile, SetIsMobile] = useState(isMobile());
  const [SearchingMobile, SetSearchingMobile] = useState(false);
  const navigate = useNavigate();
  const handleResize = () => {
    if (!ismobile && window.innerWidth < 700) {
      SetIsMobile(true);
    } else if (ismobile && window.innerWidth >= 700) {
      SetIsMobile(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <motion.div
      {...ClientMotionProps}
      style={{ height: "100%", width: "100%" }}
    >
      <Box height={"100%"} width={"100%"}>
        <LoginModal open={LoginModalOpen} SetOpen={SetLoginModalOpen} />
        <RegisterModal open={RegisetModalOpen} SetOpen={SetRegisetModalOpen} />
        <FilterModal open={FilterModalOpen} SetOpen={SetFilterModalOpen} />
        <AppBar
          variant="outlined"
          elevation={0}
          sx={{
            bgcolor: "rgb(255,255,255,0.70)",
            color: "black",
            zIndex: 9,
            backdropFilter: "blur(10px)",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              minHeight: "70px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: {
                xs: 1,
                sm: 4,
                md: 6,
              },
            }}
          >
            {!SearchingMobile ? (
              <>
                <Typography minWidth={"max-content"} variant="h6">
                  E-commerce
                </Typography>
                {ismobile ? null : (
                  <SearchBar
                    value={SearchValue}
                    onChange={(e) => SetSearchValue(e.currentTarget.value)}
                  />
                )}
                <motion.div {...ModalSlidDownMotionProps}>
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    {ismobile ? (
                      <IconButton onClick={() => SetSearchingMobile(true)}>
                        <SearchRounded
                          fontSize={isMobile() ? "medium" : "large"}
                        />
                      </IconButton>
                    ) : null}
                    <ClientMenu
                      auth={auth}
                      SetLoginModalOpen={SetLoginModalOpen}
                      SetRegisterModalOpen={SetRegisetModalOpen}
                    />
                  </Stack>
                </motion.div>
              </>
            ) : (
              <motion.div style={{ width: "100%" }} {...ClientMotionProps}>
                <Stack flexDirection={"row"}>
                  <IconButton onClick={() => SetSearchingMobile(false)}>
                    <Clear />
                  </IconButton>
                  <SearchBar
                    autoFocus={true}
                    value={SearchValue}
                    onChange={(e) => SetSearchValue(e.currentTarget.value)}
                  />
                </Stack>
              </motion.div>
            )}
          </Container>
        </AppBar>
        <Container
          maxWidth="xl"
          sx={{ paddingTop: "100px", minHeight: "100%" }}
        >
          <FeaturedSwiperSection />
          <CatagoriesSection />
          <ProductsSection />
        </Container>
      </Box>
    </motion.div>
  );
};

export default Home;
