import User from "../model/user.model.js";
import fetchData from "../service/tmdb.service.js";
import customError from "../utils/error.js";

// Add an item to the favorite list
export const addToFavorites = async (req, res, next) => {
  const userId = req.user._id;
  const { id, title, image, type } = req.body;

  try {
    const user = await User.findById(userId);

    const isFavorite = user.favorites.some((favorite) => favorite.id === id);
    if (isFavorite) {
      throw new customError("item already in favorites", 400);
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          favorites: {
            id,
            title,
            image,
            type,
            addedAt: new Date(),
          },
        },
      },
      { new: true }
    );
    const updatedUser = await User.findById(userId);

    res.status(200).json({
      success: true,
      favorites: updatedUser.favorites,
      message: "Added to favorites",
    });
  } catch (error) {
    next(error);
  }
};

// Remove an item from the favorite list
export const removeFromFavorites = async (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          favorites: { id },
        },
      },
      { new: true }
    );

    const updatedUser = await User.findById(userId);

    res
      .status(200)
      .json({
        success: true,
        message: "Removed from favorites",
        content: updatedUser.favorites,
      });
  } catch (error) {
    next(error);
  }
};

// Get the favorite list
export const getFavorites = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) throw new customError("User not found", 404);

    res.status(200).json({ success: true, content: user.favorites });
  } catch (error) {
    next(error);
  }
};
