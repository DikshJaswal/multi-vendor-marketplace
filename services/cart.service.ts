import Cart from "@/models/Cart";
import mongoose from "mongoose";

type CartItemType = {
  product: mongoose.Types.ObjectId;
  quantity: number;
};

export const addToCart = async (
  userId: string,
  productId: string,
  type?: "inc" | "dec" | "dec-all" 
) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return await Cart.create({
      user: userId,
      items: [
        {
          product: new mongoose.Types.ObjectId(productId),
          quantity: 1,
        },
      ],
    });
  }

  const items = cart.items as CartItemType[];

  const itemIndex = items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    if (type === "inc") {
      items[itemIndex].quantity += 1;

    } else if (type === "dec") {
      items[itemIndex].quantity -= 1;

      if (items[itemIndex].quantity <= 0) {
        items.splice(itemIndex, 1);
      }

    } else if (type === "dec-all") {
      // 🔥 REMOVE COMPLETELY
      items.splice(itemIndex, 1);

    } else {
      items[itemIndex].quantity += 1;
    }
  } else {
    items.push({
      product: new mongoose.Types.ObjectId(productId),
      quantity: 1,
    });
  }

  cart.items = items;

  await cart.save();
  return cart;
};

export const getCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    return { items: [] };
  }

  return cart;
};