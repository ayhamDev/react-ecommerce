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
import {
  ModalSlidDownMotionProps,
  ClientMotionProps,
} from "../../utils/ConfigMotion";
import ClientMenu from "./ClientMenu";
import SearchBar from "./SearchBar";
import { useState } from "react";
import useClientAuth from "../../hooks/useClientAuth";
import FilterModal from "./FilterModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const CustomAppBar = () => {
  const { auth } = useClientAuth();
  const [LoginModalOpen, SetLoginModalOpen] = useState(false);
  const [FilterModalOpen, SetFilterModalOpen] = useState(false);
  const [RegisetModalOpen, SetRegisetModalOpen] = useState(false);
  const [SearchValue, SetSearchValue] = useState(``);
  const [ismobile, SetIsMobile] = useState(isMobile());
  const [SearchingMobile, SetSearchingMobile] = useState(false);
  return (
    <Box>
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
    </Box>
  );
};

export default CustomAppBar;
