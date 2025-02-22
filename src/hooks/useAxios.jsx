import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://task-manager-server-bvtr.onrender.com",
  
  withCredentials: true,
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;