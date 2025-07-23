import { useNavigate } from "react-router";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ Setup interceptors once here (not inside component)
const setupInterceptors = (navigate) => {
  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosSecure.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/", { replace: true });
      }
      return Promise.reject(err);
    }
  );
};

const useAxiosSecure = () => {
  const navigate = useNavigate();

  // ✅ Only run once
  setupInterceptors(navigate);

  return axiosSecure;
};

export default useAxiosSecure;
