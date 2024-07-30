import fetchData from "../service/tmdb.service.js";
import customError from "../utils/error.js";

// Function to handle fetching trending movies
export async function getTrending(req, res, next) {
  try {
    const data = await fetchData(`trending/movie/day?language=en-US`);

    if (!data || !data.results) {
      throw new customError("No data found", 404);
    }

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    return res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    next(error);
  }
}

// Function to handle fetching movie trailers by ID
export const getTrailers = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await fetchData(`movie/${id}/videos?language=en-US`);
    if (!data || !data.results) {
      throw new customError("No data found", 404);
    }

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching movie details by ID
export const getDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await fetchData(`movie/${id}?language=en-US`);
    if (!data) {
      throw new customError("No data found", 404);
    }

    return res.status(200).json({ success: true, content: data });
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching similar movies by ID
export const getSimilar = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await fetchData(`movie/${id}/similar?language=en-US&page=1`);

    if (!data || !data.results) {
      throw new customError("No data found", 404);
    }

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error fetching similar movies:", error.message);
    next(error);
  }
};

// Function to handle fetching movies by category
export const getByCategory = async (req, res, next) => {
  const { category } = req.params;
  console.log(category);

  try {
    const data = await fetchData(`movie/${category}?language=en-US&page=1`);

    if (!data || !data.results) {
      throw new customError("No data found", 404);
    }

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error fetching movies by category:", error.message);
    next(error);
  }
};
