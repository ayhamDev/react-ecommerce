import api from "./API";

export default function GetCatagories() {
  return api.get(`/catagory`).then((res) => res.data);
}
