import api from "./API";

export default function GetOrders(token: string | undefined) {
  return api
    .get(`/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
