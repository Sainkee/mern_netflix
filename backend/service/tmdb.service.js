import axios from "axios";
import customError from "../utils/error.js";

const TMDB_TOKEN = process.env.TMBD_TOKEN;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    Accept: "application/json",
  },
});
export const fetchData = async (param) => {
  console.log(param);
  try {
    const response = await instance.get(`/${param}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err.message);
    throw new customError("Failed to fetch data from TMDb", 500);
  }
};

export default fetchData;
