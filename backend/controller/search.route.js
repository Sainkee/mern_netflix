import User from "../model/user.model.js";
import fetchData from "../service/tmdb.service.js";
import customError from "../utils/error.js";

async function saveInHistory(userId, data, searchType) {
  try {
    // console.log(data, userId);
    const result = data.results[0]; // Assuming you only care about the first result

    let historyItem = {
      id: result.id,
      createdAt: new Date(),
      searchType,
    };

    if (searchType === "person") {
      historyItem = {
        ...historyItem,
        image: result.profile_path,
        title: result.name,
      };
    } else if (searchType === "movie") {
      historyItem = {
        ...historyItem,
        image: result.poster_path,
        title: result.title,
      };
    } else if (searchType === "tv") {
      historyItem = {
        ...historyItem,
        image: result.poster_path,
        title: result.name,
      };
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          searchHistory: historyItem,
        },
      } // Return the updated document
    );
  } catch (error) {
    console.error("Error saving search history:", error.message);
    throw new Error("Unable to save search history");
  }
}

export const searchPerson = async (req, res, next) => {
  const { query } = req.params;
  const userId = req.user._id;

  try {
    const data = await fetchData(
      `search/person?query=${query}&include_adult=true&language=en-US&page=1`
    );

    if (!data || !data.results) throw new Error("No data found");

    await saveInHistory(userId, data, "person");

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    next(error);
  }
};
export const searchMovie = async (req, res, next) => {
  const { query } = req.params;
  const userId = req.user._id;

  console.log(query);

  try {
    const data = await fetchData(
      `search/movie?query=${query}&include_adult=true&language=en-US&page=1`
    );

    if (!data || !data.results) throw new Error("No data found");

    await saveInHistory(userId, data, "movie");

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    next(error);
  }
};
export const searchTv = async (req, res, next) => {
  const { query } = req.params;
  const userId = req.user._id;

  console.log(query);

  try {
    const data = await fetchData(
      `search/tv?query=${query}&include_adult=true&language=en-US&page=1`
    );

    if (!data || !data.results) throw new Error("No data found");

    await saveInHistory(userId, data, "tv");

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    next(error);
  }
};

export async function getSearchHistory(req, res, next) {
  const userId = req.user._id;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) throw new customError("User not found", 404);
    if (!user.searchHistory)
      throw new customError("No search history found", 404);

    res.status(200).json({ success: true, content: user.searchHistory });
  } catch (error) {
    next(error);
  }
}
export async function clearSearchHistory(req, res, next) {
  const userId = req.user._id;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) throw new customError("User not found", 404);
    if (!user.searchHistory)
      throw new customError("No search history found", 404);
    user.searchHistory = [];
    const updatedSearchHistory = await user.save();

    res.status(200).json({ success: true, content: updatedSearchHistory });
  } catch (error) {
    next(error);
  }
}

export async function removeItemFromSearchHistory(req, res, next) {
  let { id } = req.params;

  id = parseInt(id);

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller: ",
      error.message
    );
    next(error);
  }
}
