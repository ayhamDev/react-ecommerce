import { Box } from "@mui/material";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <Box
      overflow={"hidden"}
      position={"absolute"}
      sx={{ inset: 1, padding: 0 }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <BeatLoader color="#212121" margin={5} size={25} />
    </Box>
  );
};

export default LoadingSpinner;
