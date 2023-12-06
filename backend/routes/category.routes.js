import express from "express";
import expressAsyncHandler from "express-async-handler";
import CategoryModel from "../models/category.model.js";

const categoryRoutes = express.Router();

/** GET CATEGORIES */
categoryRoutes.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const categories = await CategoryModel.find({});
    if (categories) {
      return res.status(200).send(categories);
    }

    return res.status(501).send({ message: "Can't get categories" });
  })
);

export default categoryRoutes;
