import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import Error404 from "../assets/img/error-404.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AdminMotionProps } from "../utils/ConfigMotion";

const Page404 = () => {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <motion.div {...AdminMotionProps}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mb: 3,
                textAlign: "center",
              }}
            >
              <img
                alt="Under development"
                src={Error404}
                style={{
                  display: "inline-block",
                  maxWidth: "75%",
                  width: 400,
                }}
              />
            </Box>
            <Typography align="center" sx={{ mb: 3 }} variant="h3">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography align="center" color="text.secondary" variant="body1">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <Button
              LinkComponent={Link}
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowBackIos />
                </SvgIcon>
              }
              sx={{ mt: 3 }}
              variant="contained"
              onClick={() => {
                history.back();
              }}
            >
              Go back
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Page404;
