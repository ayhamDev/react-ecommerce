import { StarRateRounded } from "@mui/icons-material";
import { Box, Rating, Paper, Stack, Typography } from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import React from "react";
type ProductCardProps = {
  img: string;
  catagory: string;
  title: string;
  currency: string;
  rating: number;
  reviews: number;
  price: number;
};
const ProductCard = (props: ProductCardProps) => {
  return (
    <Box
      minWidth={"fit-content"}
      component={Paper}
      sx={{
        borderRadius: "0px !important",
        userSelect: "none",
        cursor: "pointer",
        transitionDuration: ".3s",
        ":hover": {
          boxShadow: shadows[4],
        },
      }}
    >
      <Box minHeight={"200px"}>
        <img
          src={props.img}
          style={{
            width: "100%",
          }}
        />
      </Box>
      <Box paddingX={4} paddingY={2}>
        <Stack paddingBottom={1}>
          <Typography variant="body2">{props.catagory}</Typography>
          <Typography variant="h6">{props.title}</Typography>
        </Stack>
        <Stack flexDirection="row" gap={1}>
          <Rating readOnly value={props.rating} />
          <Typography>({props.reviews} Reviews)</Typography>
        </Stack>
        <Typography variant="h5" color={"blue"}>
          {(props.price / 100).toFixed(2)} {props.currency}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
