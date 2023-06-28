import CustomToolbar from "./CustomToolbar";

const ToolbarContainer = () => {
  return (
    <CustomToolbar
      createBtn={true}
      createText="Create Catagory"
      createPage="/admin/catagory/create"
    />
  );
};

export default ToolbarContainer;
