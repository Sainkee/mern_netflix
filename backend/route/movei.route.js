import express from "express";
import {
  getByCategory,
  getDetail,
  getSimilar,
  getTrailers,
  getTrending,
} from "../controller/movie.controller.js";

const router = express.Router();

// Route for getting trending content based on type (movie or tv)
router.route("/").get(getTrending);

// Route for getting trailers based on type and id
router.route("/trailers/:id").get(getTrailers);

// Route for getting details based on type and id
router.route("/detail/:id").get(getDetail);

// Route for getting similar content based on type and id
router.route("/similar/:id").get(getSimilar);

// Route for getting content by category based on type and category
router.route("/:category").get(getByCategory);

export default router;
