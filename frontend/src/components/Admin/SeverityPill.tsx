import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const SeverityPillRoot = styled("span")(({ theme, ownerState }) => {
  const backgroundColor = theme.palette.grey[200];
  const color =
    theme.palette.mode === "dark"
      ? theme.palette[ownerState.color].main
      : theme.palette[ownerState.color].dark;

  return {
    alignItems: "center",
    backgroundColor,
    borderRadius: 100,
    color,
    cursor: "default",
    display: "inline-flex",
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: "center",
    letterSpacing: 0.5,
    padding: "5px 16px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  };
});

type SeverityPillProps = {
  children: React.JSX.Element;
  color?: string;
};

export const SeverityPill = (props: SeverityPillProps) => {
  const { color = "primary", children, ...other } = props;

  const ownerState = { color };

  return (
    <SeverityPillRoot ownerState={ownerState} {...other}>
      {children}
    </SeverityPillRoot>
  );
};
