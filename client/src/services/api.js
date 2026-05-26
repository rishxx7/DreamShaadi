import axios from "axios";

const API = axios.create({
  baseURL: "https://dreamshaadi.onrender.com/api",
});

export default API;