import api from "./API";

export default function GetCatagory(id: string | undefined) {
  return api.get(`/catagory/${id}`).then((res) => res.data);
}
