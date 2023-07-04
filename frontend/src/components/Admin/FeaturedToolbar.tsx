import CustomToolbar from "./CustomToolbar";

const ToolbarContainer = () => {
  return (
    <CustomToolbar
      createBtn={true}
      createPage="/admin/featured/create"
      createText="Create Featured"
    />
  );
};

export default ToolbarContainer;
