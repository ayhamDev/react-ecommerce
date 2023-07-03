import React, { useState, useEffect } from "react";
import { Stack, Typography, Slider, TextField, Box } from "@mui/material";

export default function PriceFilter(props: { min: number; max: number }) {
  const minmin = props.min;
  const maxmax = props.max;
  const [priceRangeValue, setPriceRangeValue] = useState([minmin, maxmax]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue);
  };

  console.log(priceRangeValue);

  return (
    <Box paddingY={2}>
      <Typography variant="subtitle1">Price </Typography>
      <Slider
        getAriaLabel={() => "Price range"}
        value={priceRangeValue}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="off"
        min={minmin}
        max={maxmax}
      />
      <Stack
        paddingTop={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          size="small"
          label="min"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ width: "90px" }}
          value={priceRangeValue[0]}
          onChange={(e) => {
            setPriceRangeValue([
              Number(e.target.value.replace(/\D/g, ``)),
              priceRangeValue[1],
            ]);
          }}
        />
        <Typography>-</Typography>
        <TextField
          size="small"
          label="max"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          sx={{ width: "90px" }}
          value={priceRangeValue[1]}
          onChange={(e) => {
            setPriceRangeValue([
              priceRangeValue[0],
              Number(e.target.value.replace(/\D/g, ``)),
            ]);
          }}
        />
      </Stack>
    </Box>
  );
}
