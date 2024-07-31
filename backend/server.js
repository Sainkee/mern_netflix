import express, { urlencoded } from "express";
import dotenv from "dotenv";
import errorHandlingMiddleware from "./middlewere/error.middlewere.js";
import dbConnect from "./utils/dbConnect.js";
import userRouter from "./route/user.route.js";
import movieRouter from "./route/movei.route.js";
import tvRouter from "./route/tv.route.js";
import favoriteRouter from "./route/favorite.route.js";
import searchRouter from "./route/search.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));

app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use("/v1/user", userRouter);
app.use("/v1/movie", movieRouter);
app.use("/v1/tv", tvRouter);
app.use("/v1/favorite", favoriteRouter);
app.use("/v1/search/", searchRouter);

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  dbConnect();
});
