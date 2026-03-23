import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

export const placeOrder = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let totalAmount = 0;

  const orderItems = cart.items.map((item: any) => {
    const price = item.product.price;

    totalAmount += price * item.quantity;

    return {
      product: item.product._id,
      quantity: item.quantity,
      price: price, // snapshot
    };
  });

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    shippingAddress: "Default Address",
  });

  // Clear cart after order
  cart.items = [];
  await cart.save();

  return order;
};

export const getUserOrders = async (userId: string) => {
  const orders = await Order.find({ user: userId })
    .populate("items.product")
    .sort({ createdAt: -1 });

  return orders;
};

export const getSellerOrders = async (sellerId: string) => {
  // Step 1: Find seller's products
  const products = await Product.find({ seller: sellerId });

  const productIds = products.map((p) => p._id);

  // Step 2: Find orders containing these products
  const orders = await Order.find({
    "items.product": { $in: productIds },
  })
    .populate("items.product")
    .sort({ createdAt: -1 });

  return orders;
};