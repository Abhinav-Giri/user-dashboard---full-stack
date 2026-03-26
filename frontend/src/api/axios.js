import axios from "axios";

const instance = axios.create({
  baseURL: "https://user-dashboard-enww.onrender.com/api",
});

export default instance;