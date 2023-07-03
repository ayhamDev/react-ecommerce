import api from "./API";

export default function GetSettings() {
  return api.get(`/settings`).then((res) => res.data);
}
