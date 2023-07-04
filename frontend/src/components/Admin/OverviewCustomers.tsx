import { ArrowForwardIos } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const OverviewProducts = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader
        title="Latest Customers"
        action={
          <Button
            onClick={() => {
              navigate("/admin/user");
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
        <List
          disablePadding
          className="scrollbar"
          sx={{
            minWidth: "100%",
            maxWidth: "max-content",
            overflowX: "auto",
            maxHeight: "500px",
          }}
        >
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
          <ListItem
            disableGutters
            sx={{
              minWidth: "100%",
              width: "max-content",
              maxWidth: "max-content",
            }}
          >
            <ListItemText
              primary="ayhamgm81@gmail.com"
              secondary="2 days ago"
            />
          </ListItem>
          <Divider />
        </List>
      </CardContent>
    </Card>
  );
};

export default OverviewProducts;
