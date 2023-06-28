import api from "./API";

export default function GetOrder(token: string | undefined) {
  return api
    .get(`/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
