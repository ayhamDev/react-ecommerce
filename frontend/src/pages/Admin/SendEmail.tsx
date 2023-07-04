import { useLayoutEffect } from "react";
import useAdminAuth from "../../hooks/useAdminAuth";

const SendEmail = () => {
  const { VerifyToken } = useAdminAuth();
  useLayoutEffect(() => {
    VerifyToken();
  });
  return <div> SendEmail </div>;
};

export default SendEmail;
