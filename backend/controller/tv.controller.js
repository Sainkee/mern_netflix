import fetchData from "../service/tmdb.service.js";
import customError from "../utils/error.js";

// Function to handle fetching trending tv
export async function getTrending(req, res, next) {
  try {
    const data = await fetchData(`trending/tv/day?language=en-US`);

    if (!data || !data.results) {
      throw new customError("No data found", 404);
    }

    const randomTv =
      data.results[Math.floor(Math.random() * data.results.length)];

    return res.status(200).json({ success: true, content: randomTv });
  } catch (error) {
    console.error("Error fetching trending tv:", error.message);
    next(error);
  }
}

// Function to handle fetching tv trailers by ID
export const getTrailers = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await fetchData(`tv/${id}/videos?language=en-US`);
    if (!data || !data.results) {
      throw new customError("No data found", 404);
    }

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching tv details by ID
export const getDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await fetchData(`tv/${id}?language=en-US`);
    if (!data) {
      throw new customError("No data found", 404);
    }

    return res.status(200).json({ success: true, content: data });
  } catch (error) {
    next(error);
  }
};

// Function to handle fetching similar tv by ID
export const getSimilar = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await fetchData(`tv/${id}/similar?language=en-US&page=1`);

    if (!data || !data.results) {
      throw new customError("No data found", 404);
    }

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error fetching similar tv:", error.message);
    next(error);
  }
};

// Function to handle fetching tv by category
export const getByCategory = async (req, res, next) => {
  const { category } = req.params;
  console.log(category);

  try {
    const data = await fetchData(`tv/${category}?language=en-US&page=1`);

    if (!data || !data.results) {
      throw new customError("No data found", 404);
    }

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error fetching tv by category:", error.message);
    next(error);
  }
};
