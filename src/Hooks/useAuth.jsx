import React, { use } from "react";
import { AuthContext } from "../Contexts/AuthContexts";

const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;