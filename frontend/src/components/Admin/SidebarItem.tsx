import {
  Box,
  Divider,
  ListItem,
  colors,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  List,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
export default function SidebarItemSmall({
  role,
  open,
  setOpen,
  ismobile,
}: {
  open: boolean;
  // @ts-ignore
  role: { title?: string; items?: { label?: string; icon?: JSX.Element }[] };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ismobile: boolean;
}) {
  const route = useLocation();
  const navigate = useNavigate();

  if (ismobile)
    return (
      <Box key={role.title}>
        {role.title ? (
          <>
            <Divider style={{ background: "#d9d9d9", opacity: 0.2 }} />
            <ListItem sx={{ pb: 0 }}>
              <ListItemText
                sx={{ color: colors.grey[200], opacity: 0.5 }}
                primary={role.title}
              />
            </ListItem>
          </>
        ) : null}
        {/* @ts-ignore */}
        {role.items.map((item, index) => (
          <List key={index}>
            <ListItem
              disablePadding
              sx={{ display: "block", color: colors.grey[300], p: "5px 10px" }}
            >
              <ListItemButton
                onClick={() => {
                  setOpen(false);
                  // @ts-ignore
                  navigate(`${item.path}`);
                }}
                sx={{
                  transitionDuration: ".3s",
                  ":hover": {
                    bgcolor:
                      // @ts-ignore

                      item.path === route.pathname
                        ? colors.grey["A700"]
                        : colors.grey[900],
                  },
                  bgcolor:
                    // @ts-ignore

                    item.path === route.pathname ? colors.grey["A700"] : null,
                  borderRadius: "15px",
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        ))}
      </Box>
    );
  return (
    <Box key={role.title}>
      {role.title ? (
        <>
          <Divider style={{ background: "#d9d9d9", opacity: 0.2 }} />
          {open ? (
            <ListItem sx={{ pb: 0 }}>
              <ListItemText
                sx={{ color: colors.grey[200], opacity: 0.5 }}
                primary={role.title}
              />
            </ListItem>
          ) : (
            ""
          )}
        </>
      ) : null}
      {/* @ts-ignore */}
      {role.items.map((item, index) => (
        <List key={index}>
          {!open ? (
            <Tooltip title={item.label} placement="right-end">
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  color: colors.grey[300],
                  p: "5px 10px",
                }}
              >
                <ListItemButton
                  onClick={() => {
                    // @ts-ignore
                    navigate(`${item.path}`);
                  }}
                  sx={{
                    transitionDuration: ".3s",
                    ":hover": {
                      bgcolor:
                        // @ts-ignore

                        item.path === route.pathname
                          ? colors.grey["A700"]
                          : colors.grey[900],
                    },

                    bgcolor:
                      // @ts-ignore
                      item.path === route.pathname ? colors.grey["A700"] : null,
                    borderRadius: "15px",
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ) : (
            <ListItem
              disablePadding
              sx={{ display: "block", color: colors.grey[300], p: "5px 10px" }}
            >
              <ListItemButton
                onClick={() => {
                  // @ts-ignore
                  navigate(`${item.path}`);
                }}
                sx={{
                  transitionDuration: ".3s",
                  ":hover": {
                    bgcolor:
                      // @ts-ignore

                      item.path === route.pathname
                        ? colors.grey["A700"]
                        : colors.grey[900],
                  },

                  bgcolor:
                    // @ts-ignore
                    item.path === route.pathname ? colors.grey["A700"] : null,
                  borderRadius: "15px",
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      ))}
    </Box>
  );
}
