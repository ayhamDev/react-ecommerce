import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SetName } from "../../../store/slice/Page";
import { useParams } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const dispacth = useDispatch();
  useLayoutEffect(() => {
    dispacth(SetName("Product Details"));
  });
  const [copied, SetCopied] = useState(false);
  const Theme = useTheme();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const ProductIdElementRef = useRef<HTMLHeadingElement | null>(null);
  return (
    <Paper elevation={2} sx={{ padding: Theme.spacing(2) }}>
      <form>
        <Box display={"flex"} flexDirection={"column"} gap={Theme.spacing(4)}>
          <Typography
            variant="h6"
            component={"h6"}
            display={"flex"}
            alignItems={"center"}
            flexWrap={"wrap"}
            sx={{
              fontSize: {
                xs: "0.85rem",
                md: "1.25rem",
              },
              justifyContent: {
                xs: "center",
                md: "start",
              },
            }}
          >
            <Box>Product ID: </Box>
            <Box
              ref={ProductIdElementRef}
              onClick={async () => {
                navigator.clipboard
                  .writeText(ProductIdElementRef.current?.textContent)
                  .then(() => {
                    SetCopied(true);
                    setTimeout(() => {
                      SetCopied(false);
                    }, 2500);
                  });
              }}
              sx={{
                userSelect: "none",
                cursor: "pointer",
                marginLeft: Theme.spacing(1),
                paddingX: Theme.spacing(2),
                paddingY: Theme.spacing(1),
                bgcolor: Theme.palette.grey[300],
                borderRadius: "24px",
              }}
            >
              {id}
            </Box>
          </Typography>
          <TextField
            id="titleRef"
            inputRef={titleRef}
            name="title"
            label="Title"
            variant="outlined"
            autoFocus
            fullWidth
            required
          />
          <TextField
            id="description"
            inputRef={descriptionRef}
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={5}
          />
          <TextField
            id="titleRef"
            inputRef={titleRef}
            name="title"
            type="number"
            label="Price (In Cents)"
            variant="outlined"
            autoFocus
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel id="select-catagory">Catagory</InputLabel>
            <Select
              labelId="select-catagory"
              id="catagory"
              label="Catagory"
              required
            ></Select>
          </FormControl>
        </Box>
      </form>
      <Snackbar open={copied} message="Copied To Clipboard." />;
    </Paper>
  );
};

export default ProductDetails;
