import { StarRateRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React from "react";

const Rating = ({
  rating,
  reviews = 0,
}: {
  rating: number;
  reviews: number;
}) => {
  return (
    <Stack flexDirection="row">
      <StarRateRounded />
      <StarRateRounded />
      <StarRateRounded />
      <StarRateRounded />
      <StarRateRounded />
    </Stack>
  );
};

export default Rating;
