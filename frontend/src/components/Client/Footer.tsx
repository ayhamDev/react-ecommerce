import { EmailRounded, LocationOn, Phone } from "@mui/icons-material";
import { Box, Container, Typography, Stack, colors, Link } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      paddingY={4}
      width={"100%"}
      bgcolor={"#222222"}
      marginTop={12}
      color={colors.grey[100]}
    >
      <Container maxWidth="xl">
        <Stack
          flexDirection={"row"}
          gap={12}
          flexWrap={"wrap"}
          sx={{
            justifyContent: {
              xs: "center",
              sm: "space-between",
            },
          }}
        >
          <Stack>
            <Typography minWidth={"max-content"} variant="h6">
              E-commerce
            </Typography>
            <Box paddingTop={2}>
              <Typography
                minWidth={"max-content"}
                variant="subtitle1"
                color={colors.grey[300]}
              >
                Social Links
              </Typography>
              <Stack paddingTop={1}>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    fontFamily: "Roboto",
                  }}
                  color={colors.grey[400]}
                >
                  facebook
                </Link>
              </Stack>
            </Box>
          </Stack>
          <Stack>
            <Typography
              minWidth={"max-content"}
              variant="subtitle1"
              color={colors.grey[300]}
            >
              Contact Info
            </Typography>
            <Stack gap={2} paddingTop={2}>
              <Stack flexDirection={"row"} gap={1}>
                <EmailRounded />
                <Typography>ecommerce@example.com</Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <Phone />
                <Typography>+201001577302</Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={1}>
                <LocationOn />
                <Typography>Address</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
