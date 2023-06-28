import api from "./API";

export default function GetProducts() {
  return api.get(`/product`).then((res) => res.data);
}
