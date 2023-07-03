import { Grid, Typography, Paper, Stack, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import GetProducts from "../../api/GetProducts";
import LoadingSpinner from "../LoadingSpinner";
import GetSettings from "../../api/GetSettings";
import { StarRate } from "@mui/icons-material";

const ItemList = () => {
  const { data, status } = useQuery({
    queryKey: ["product"],
    queryFn: GetProducts,
  });
  const { data: SettingsData, status: SettingsStatus } = useQuery({
    queryKey: ["settings"],
    queryFn: GetSettings,
  });
  if (status == "loading") return <LoadingSpinner />;
  if (SettingsStatus == "loading") return <LoadingSpinner />;
  return (
    <Stack
      flexDirection={"row"}
      flexWrap={"wrap"}
      gap={4}
      sx={{
        justifyContent: {
          xs: "center",
          sm: "space-between",
        },
      }}
    >
      {data?.map((product, index: number) => (
        <Box
          key={index}
          sx={{
            cursor: "pointer",
          }}
        >
          <Stack component={Paper}>
            <img
              src={`${import.meta.env.VITE_API_URL}/image/${product.images[0]}`}
              loading="lazy"
              style={{
                objectFit: "contain",
                backgroundColor: "white",
                display: "block",
                width: "250px",
                height: "250px",
              }}
            />
            <Stack paddingX={4} paddingY={2}>
              <Typography variant="h6">
                {(product.price / 100).toFixed(2)} {SettingsData.currency.code}
              </Typography>
              <Typography>{product.title} </Typography>
              <Stack flexDirection={"row"} alignItems={"center"}>
                <Typography
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  4.5
                </Typography>
                <StarRate
                  sx={{
                    color: "#f6bb08",
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default ItemList;
