import React, { useLayoutEffect } from "react";
import Dashboard from "./Dashboard";
import useAdminAuth from "../../hooks/useAdminAuth";

const SendEmail = () => {
  const { VerifyToken } = useAdminAuth();
  useLayoutEffect(() => {
    VerifyToken();
  });
  return <div> SendEmail </div>;
};

export default SendEmail;
