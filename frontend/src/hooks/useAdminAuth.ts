import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { LogOut } from "../store/slice/AdminAuthSlice";
import api from "../api/API";

const useAdminAuth = () => {
  const auth = useSelector((state: RootState) => state.adminAuth.value);
  const dispatch = useDispatch();

  return {
    admin: auth,
    LogOut: () => {
      return dispatch(LogOut());
    },
    VerifyToken: async () => {
      try {
        await api.get("/verifytoken", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        return true;
      } catch (err) {
        dispatch(LogOut());
        console.log(err);
      }
    },
  };
};

export default useAdminAuth;
