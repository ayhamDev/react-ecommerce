import axios from "axios";

export default function GetOrder(token: string | undefined) {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
