import express from "express";
import { JWTauthentication } from "../middlewere/auth.middlewere.js";
import { addToFavorites, getFavorites, removeFromFavorites } from "../controller/favoritelist.controller.js";
const router = express.Router();

router.use(JWTauthentication)

router.route("/").get(getFavorites)

router.route("/:id").post(addToFavorites).delete(removeFromFavorites)

export default router;
