import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
  });

  useEffect(() => {
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
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
