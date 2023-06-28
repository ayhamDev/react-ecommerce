import api from "./API";

export default function GetCatagory(id) {
  return api.get(`/catagory/${id}`).then((res) => res.data);
}
