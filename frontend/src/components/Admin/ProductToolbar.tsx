import CustomToolbar from "./CustomToolbar";

const ToolbarContainer = () => {
  return (
    <CustomToolbar
      createBtn={true}
      createText="Create Product"
      createPage="/admin/product/create"
    />
  );
};

export default ToolbarContainer;
