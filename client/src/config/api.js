import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://10.100.102.7:3000",
  withCredentials: true,
});
