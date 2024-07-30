import express from "express";
import { JWTauthentication } from "../middlewere/auth.middlewere.js";
import {
    clearSearchHistory,
  getSearchHistory,
  removeItemFromSearchHistory,
  searchMovie,
  searchPerson,
} from "../controller/search.route.js";

const router = express.Router();

router.use(JWTauthentication);

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
// router.get("/movie/:query", searchMovie);
// router.get("/tv/:query", searchTv);

router.get("/history", getSearchHistory);
router.get("/clearHistory", clearSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
