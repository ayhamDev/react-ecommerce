import { Box } from "@mui/material";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = (props: { size?: number }) => {
  return (
    <Box
      overflow={"hidden"}
      position={"absolute"}
      sx={{ inset: 1, padding: 0 }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <BeatLoader
        color="#212121"
        margin={5}
        size={props.size ? props.size : 25}
      />
    </Box>
  );
};

export default LoadingSpinner;
