import axios from "axios";
import customError from "../utils/error.js";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmYwZmJkZjE4NWY2NzZjYTEyZjQwMjFjMDczMzdiNyIsInN1YiI6IjY2MzVlNjlkZTkyZDgzMDEyN2QzMWJiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bik4urvJd0SXlot4xbkTj7q25wq_XDhIvZWaGykqetA";

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
