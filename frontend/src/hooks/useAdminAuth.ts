import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { LogOut } from "../store/slice/AdminAuthSlice";
import api from "../api/API";

const useAdminAuth = () => {
  const auth = useSelector((state: RootState) => state.adminAuth.value);
  const dispatch = useDispatch();

  return {
    VerifyToken: async () => {
      try {
        await api.get("/verifytoken", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
      } catch (err) {
        dispatch(LogOut());
        console.log(err);
      }
    },
  };
};

export default useAdminAuth;
