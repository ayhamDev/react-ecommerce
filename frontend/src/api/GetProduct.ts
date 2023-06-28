import api from "./API";

export default function GetProducts(id) {
  return api.get(`/product/${id}`).then((res) => res.data);
}
