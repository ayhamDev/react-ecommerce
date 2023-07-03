import { SearchRounded } from "@mui/icons-material";
import { TextField, Box, TextFieldProps } from "@mui/material";
import React from "react";
import { ClientMotionProps } from "../../utils/ConfigMotion";
import { motion } from "framer-motion";

const SearchBar = (props: TextFieldProps) => {
  return (
    <Box sx={{ py: 1, width: "100%" }}>
      <TextField
        {...props}
        label="Search"
        variant="outlined"
        type="search"
        color="info"
        size="small"
        fullWidth
      />
    </Box>
  );
};

export default SearchBar;
