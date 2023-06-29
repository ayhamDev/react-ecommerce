import api from "./API";

export default function GetOrders(
  token: string | undefined,
  userId: string | undefined,
  orderId: string | undefined
) {
  return api
    .get(`/order/${userId}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
