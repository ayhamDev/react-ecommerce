import { Checkbox, FormControlLabel, Stack, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import GetCatagories from "../../api/GetCatagories";
import LoadingSpinner from "../LoadingSpinner";

const CatagoryFilter = () => {
  const { status, data } = useQuery({
    queryKey: ["catagory"],
    queryFn: GetCatagories,
  });
  if (status == "loading") return <LoadingSpinner size={10} />;

  return (
    <Stack
      paddingY={1}
      sx={{
        userSelect: "none",
      }}
    >
      {data?.map((item, index) => (
        <Box key={index}>
          <FormControlLabel
            control={<Checkbox defaultChecked={false} color="info" />}
            label={`${item.catagory.name} (${item.length})`}
            name="laptop"
            onChange={(e, v) => {}}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default CatagoryFilter;
