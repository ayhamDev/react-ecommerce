import { Box, Typography, colors, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CatagoriesSection = () => {
  const navigate = useNavigate();
  return (
    <Box paddingTop={2}>
      <Typography variant="h6">Shop By Catagory</Typography>

      <Stack
        flexDirection={"row"}
        gap={4}
        paddingTop={2}
        flexWrap={"wrap"}
        sx={{
          justifyContent: {
            xs: "center",
            sm: "start",
          },
        }}
      >
        <Box
          onClick={() => {
            navigate("/catagory/phones");
          }}
          width={"fit-content"}
          height={"fit-content"}
          sx={{
            cursor: "pointer",
            userSelect: "none",
            bgcolor: colors.grey[200],
            paddingX: 2,
            paddingY: 1,
            borderRadius: "20px",
          }}
        >
          <Typography>Phones</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CatagoriesSection;
