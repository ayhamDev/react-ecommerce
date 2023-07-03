import { Typography, Box, Stack, Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ProductsSectionProps = {
  title: string;
};
const ProductsSection = (props: ProductsSectionProps) => {
  const [SlidesPerView, SetSlidesPerView] = React.useState(4);
  const HandleResize = () => {
    if (window.innerWidth < 1200) {
      SetSlidesPerView(3);
    }
    if (window.innerWidth < 950) {
      SetSlidesPerView(2);
    }
    if (window.innerWidth < 600) {
      SetSlidesPerView(1);
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", HandleResize);
    HandleResize();
    return () => {
      window.removeEventListener("resize", HandleResize);
    };
  }, []);
  return (
    <Box paddingTop={4} paddingBottom={2}>
      <Typography variant="h4" marginBottom={4}>
        {props.title}
      </Typography>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={SlidesPerView}
      >
        <SwiperSlide>
          <ProductCard
            img="/s.png"
            title="Watch"
            catagory="Smart Watch"
            price={2000}
            reviews={3}
            currency="EGP"
            rating={4.2}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard
            img="/s.png"
            title="Watch"
            catagory="Smart Watch"
            price={2000}
            reviews={3}
            currency="EGP"
            rating={4.2}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard
            img="/s.png"
            title="Watch"
            catagory="Smart Watch"
            price={2000}
            reviews={3}
            currency="EGP"
            rating={4.2}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard
            img="/s.png"
            title="Watch"
            catagory="Smart Watch"
            price={2000}
            reviews={3}
            currency="EGP"
            rating={4.2}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard
            img="/s.png"
            title="Watch"
            catagory="Smart Watch"
            price={2000}
            reviews={3}
            currency="EGP"
            rating={4.2}
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default ProductsSection;
