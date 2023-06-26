import CustomToolbar from "./CustomToolbar";

const ToolbarContainer = () => {
  return (
    <CustomToolbar
      createBtn={true}
      createText="Create Catagory"
      createPage="/admin/cms/catagory/create"
    />
  );
};

export default ToolbarContainer;
