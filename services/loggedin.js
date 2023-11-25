import { useEffect } from "react";

const useAuth = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  }, []);
};
export default useAuth;
