import express from "express";
import expressAsyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import CartModel from "../models/cart.model.js";

const cartRouter = express.Router();

cartRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const { cartItems, user_id } = req.body;

      const savedItems = await Promise.all(
        cartItems.map(async (item) => {
          const cartData = {
            _id: uuidv4(),
            user_id: user_id,
            course_id: item._id,
            createdAt: new Date().toISOString(),
          };

          return await CartModel.create(cartData);
        })
      );

      res.status(201).json(savedItems);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

export default cartRouter;
