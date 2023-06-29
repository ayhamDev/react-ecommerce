import api from "./API";

export default function GetSettings(Token: string | undefined) {
  return api
    .get(`/settings`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
    .then((res) => res.data);
}
