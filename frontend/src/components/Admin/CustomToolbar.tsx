import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
type Props = {
  createBtn: boolean;
  createText?: string;
  createPage?: string;
};
const CustomToolbar = (props: Props) => {
  const navigate = useNavigate();
  return (
    <GridToolbarContainer
      sx={{
        justifyContent: "space-between",
      }}
    >
      <GridToolbarExport />
      {props.createBtn ? (
        <Button
          variant="contained"
          onClick={() =>
            // @ts-ignore
            navigate(props.createPage)
          }
        >
          {props.createText}
        </Button>
      ) : null}
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
