import axios from "axios";

// const BASE_URL =
//   process.env.NODE_ENV === "development"
//     ? process.env.REACT_APP_BASE_URL
//     : process.env.REACT_APP_BACKEND_BASE_URL;

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

console.log("urllllll>>>>", process.env.NODE_ENV);
