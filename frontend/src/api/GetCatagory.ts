import axios from "axios";

export default function GetCatagory() {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/catagory`)
    .then((res) => res.data);
}
