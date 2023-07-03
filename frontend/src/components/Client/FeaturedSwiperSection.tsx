import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Button, Stack, Typography, colors } from "@mui/material";
import { motion } from "framer-motion";
import { ClientMotionProps } from "../../utils/ConfigMotion";

const FeaturedSwiperSection = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
    >
      <motion.div {...ClientMotionProps}>
        <SwiperSlide>
          <Box
            sx={{
              bgcolor: colors.brown[100],
              borderRadius: "20px",
              width: "100%",
              height: "100%",
              minHeight: "500px",
              paddingY: 8,
              paddingX: {
                xs: 6,
                sm: 8,
                md: 12,
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              flexDirection={"row"}
              flexWrap={"wrap"}
              width={"100%"}
              gap={8}
              sx={{
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "space-between",
                },
              }}
            >
              <Box>
                <Typography variant="h3" color={colors.grey[50]}>
                  The Best Phones
                </Typography>
                <Typography variant="h6" color={colors.grey[50]}>
                  Starting At 500 EGP
                </Typography>
                <Box paddingTop={2}>
                  <Button variant="outlined">Shop Now</Button>
                </Box>
              </Box>
              <Box>
                <img
                  style={{
                    maxWidth: "420px",
                    minWidth: "100%",
                    width: "100%",
                    display: "block",
                  }}
                  src="/sd.png"
                />
              </Box>
            </Stack>
          </Box>
        </SwiperSlide>
      </motion.div>
      <SwiperSlide>
        <Box
          sx={{
            bgcolor: colors.brown[100],
            borderRadius: "20px",
            width: "100%",
            height: "100%",
            paddingY: 8,
            paddingX: {
              xs: 6,
              sm: 8,
              md: 12,
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            flexDirection={"row"}
            flexWrap={"wrap"}
            width={"100%"}
            gap={8}
            sx={{
              alignItems: "center",
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "center",
                lg: "space-between",
              },
            }}
          >
            <Box>
              <Typography variant="h3" color={colors.grey[50]}>
                The Best Phones
              </Typography>
              <Typography variant="h6" color={colors.grey[50]}>
                Starting At 500 EGP
              </Typography>
              <Box paddingTop={2}>
                <Button variant="outlined">Shop Now</Button>
              </Box>
            </Box>
            <Box>
              <img
                style={{
                  maxWidth: "420px",
                  minWidth: "100%",
                  width: "100%",
                  display: "block",
                }}
                src="/sd.png"
              />
            </Box>
          </Stack>
        </Box>
      </SwiperSlide>
    </Swiper>
  );
};

export default FeaturedSwiperSection;
