import api from "./API";

export default function GetCatagory() {
  return api.get(`/catagory`).then((res) => res.data);
}
