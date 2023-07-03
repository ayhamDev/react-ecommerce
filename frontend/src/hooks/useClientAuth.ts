import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { LogOut, Login } from "../store/slice/AuthSlice";
import api from "../api/API";

const useClientAuth = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();

  return {
    auth,
    LogOut: () => {
      return dispatch(LogOut());
    },
    LogIn: (data: object) => {
      return dispatch(Login(data));
    },

    Register: (payload: {
      name: string;
      email: string;
      password: string;
      address: object;
      phoneNo: string;
    }) => {
      if (
        !payload.email ||
        !payload.password ||
        !payload.name ||
        !payload.address ||
        !payload.phoneNo
      )
        if (!payload.email || !payload.password) return { error: true };

      api
        .post("/auth/register", {
          email: payload.email,
          password: payload.password,
        })
        .then((res) => {
          dispatch(Login(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
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

export default useClientAuth;
