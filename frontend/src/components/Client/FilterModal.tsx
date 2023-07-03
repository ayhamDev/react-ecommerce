import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  Dialog,
} from "@mui/material";
import React from "react";
import CatagoryFilter from "./CatagoryFilter";
import PriceFilter from "./PriceFilter";
import { motion } from "framer-motion";
import { ModalSlidDownMotionProps } from "../../utils/ConfigMotion";

type ModalProps = {
  open: boolean;
  SetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const PaperWrapper = (props) => {
  return (
    <Paper
      sx={{
        margin: 2,
        maxWidth: "500px",
        width: "500px",
        minWidth: "auto",
      }}
    >
      {props.children}
    </Paper>
  );
};
const ModalMotion = (props) => {
  return (
    <motion.div style={{ height: "100%" }} {...ModalSlidDownMotionProps}>
      {props.children}
    </motion.div>
  );
};

const FilterModal = (props: ModalProps) => {
  const handleModalClose = () => {
    props.SetOpen(false);
  };
  return (
    <Dialog
      open={props.open}
      onClose={handleModalClose}
      PaperComponent={PaperWrapper}
      TransitionComponent={ModalMotion}
    >
      <Box
        component={Paper}
        className="FancyBoxShadow"
        sx={{
          padding: 2,
          top: "100px",
        }}
      >
        <Typography variant="h6">Filter By</Typography>
        <Stack paddingTop={2}>
          <Typography variant="subtitle1">Catagories</Typography>
          <CatagoryFilter />
          <Divider />
          <PriceFilter min={0} max={1000} />
          <Divider />
        </Stack>
        <Stack flexDirection={"row"} gap={2} paddingTop={2}>
          <Button fullWidth variant="outlined">
            Cancel
          </Button>
          <Button fullWidth variant="contained">
            Apply
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default FilterModal;
