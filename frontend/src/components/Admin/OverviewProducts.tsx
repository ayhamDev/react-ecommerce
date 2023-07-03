import { ArrowForwardIos } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const OverviewProducts = (products) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader
        title="Latest Customers"
        action={
          <Button
            onClick={() => {
              navigate("/admin/product");
            }}
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowForwardIos />
              </SvgIcon>
            }
            size="small"
            variant="outlined"
          >
            View all
          </Button>
        }
      />
      <CardContent>
        <List disablePadding sx={{ width: "max-content", overflowX: "auto" }}>
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemText
                primary="ayhamgm90@gmail.com"
                secondary="2 days ago"
              />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disableGutters>
            <ListItemButton>
              <ListItemText
                primary="ayhamgm81@gmail.com"
                secondary="2 days ago"
              />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disableGutters>
            <ListItemButton>
              <ListItemText
                primary="ayhamgm81@gmail.com"
                secondary="2 days ago"
              />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disableGutters>
            <ListItemButton>
              <ListItemText
                primary="ayhamgm81@gmail.com"
                secondary="2 days ago"
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemText
                primary="ayhamgm81@gmail.com"
                secondary="2 days ago"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default OverviewProducts;
