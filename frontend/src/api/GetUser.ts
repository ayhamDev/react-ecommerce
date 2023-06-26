import axios from "axios";

export default function GetOrder(token: string | undefined) {
  console.log(token);

  return axios
    .get(`${import.meta.env.VITE_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
