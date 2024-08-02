import customError from "../utils/error.js";
import User from "../model/user.model.js";
import cloudinaryUpload from "../utils/cloudinary.js";
import fs from "fs";
const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById({ _id: userId });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error while generating tokens:", error);
    throw new customError("error while generating tokens", 500);
  }
};

export const registerUser = async (req, res, next) => {
  let { email, password, username, role } = req.body;

  if (!role) {
    role = "USER";
  }

  if ([email, password, username].some((item) => !item || item.trim() === "")) {
    throw new customError("All fields are required", 400);
  }

  if (!req.file) {
    return res.status(400).json({ message: "No logo uploaded" });
  }
  try {
    const result = await cloudinaryUpload.uploader.upload(req.file.path, {
      public_id: crypto.randomUUID(),
      folder: "uploads",
    });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new customError("user already exist", 409); //conflict code
    }

    const newUser = new User({
      email,
      password,
      username,
      role,
      userprofile: result.secure_url,
    });

    await User.create(newUser);
    const createdUser = await User.findOne({ _id: newUser._id }).select(
      "-password -refreshToken"
    );

    return res
      .status(201)
      .json({ message: "user created successfully", createdUser });
  } catch (error) {
    next(error);
  } finally {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Failed to delete local file:", err);
      } else {
        console.log("Local file deleted successfully");
      }
    });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    if (!(username || email)) {
      throw new customError("email or username is required", 404);
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      throw new customError("user not fouund", 404);
    }

    if (!user.isPasswordCorrect(password)) {
      throw new customError(" invalid password", 404);
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const cookieOption = {
      secure: true, //Ensures cookies are only sent over HTTPS connections. if true
      httpOnly: true,
      sameSite:"none" //XSS (Cross-Site Scripting) attacks.
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOption)
      .cookie("refreshToken", refreshToken, cookieOption)
      .json({
        user: loggedInUser,
        message: "user login successfully",
        accessToken,
        refreshToken,
      });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res) => {
  const id = req.user._id;

  try {
    await User.findByIdAndUpdate(
      id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
    const cookieOption = {
      secure: true,
      httpOnly: true, //XSS (Cross-Site Scripting) attacks
      sameSite: "None",
    };

    return res
      .status(200)
      .clearCookie("accessToken", { path: "/" }, cookieOption)
      .clearCookie("refreshToken", { path: "/" }, cookieOption)
      .json({ message: "user logged out" });
  } catch (error) {
    next(new customError("something went wrong" || error.message, 500));
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new customError("unauthorized access, send refreshToken", 401);
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_KEY
    );

    const user = await User.findById(decodedToken._id).select("refreshToken");

    if (!user) {
      throw new customError("invalid refresh token", 401);
    }

    if (user?.refreshToken !== incomingRefreshToken) {
      throw new customError(
        "refresh token expire or used try to login again",
        401
      );
    }

    const cookieOption = {
      secure: false,
      httpOnly: false,
      sameSite: "None",
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessandRefreshToken(user._id);

    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOption)
      .cookie("refreshToken", newRefreshToken, cookieOption)
      .json({
        message: "access token refreshed",
        accessToken,
        refreshToken: newRefreshToken,
      });
  } catch (error) {
    next(
      new customError(
        error.message || "Error while refreshing access token",
        500
      )
    );
  }
};
