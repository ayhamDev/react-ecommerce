import api from "./API";

export default function GetProduct(id: string | undefined) {
  return api.get(`/product/${id}`).then((res) => res.data);
}
