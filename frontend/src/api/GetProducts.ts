import axios from "axios";

export default function GetProducts() {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/product`)
    .then((res) => res.data);
}
