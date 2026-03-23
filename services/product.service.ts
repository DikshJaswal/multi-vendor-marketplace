import Product from "@/models/Product";

export const createProduct = async (data: {
  title: string;
  description?: string;
  price: number;
  images?: string[];
  category?: string;
  seller: string;
}) => {
  const product = await Product.create(data);
  return product;
};

export const getAllProducts = async () => {
  const products = await Product.find()
    .populate("seller", "name email")
    .sort({ createdAt: -1 });

  return products;
};

export const getProductById = async (id: string) => {
  const product = await Product.findById(id)
    .populate("seller", "name email");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const updateProduct = async (
  productId: string,
  userId: string,
  userRole: string,
  data: any
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  // Ownership check
  if (
    product.seller.toString() !== userId &&
    userRole !== "admin"
  ) {
    throw new Error("Not authorized to update this product");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    data,
    { new: true }
  );

  return updatedProduct;
};

export const deleteProduct = async (
  productId: string,
  userId: string,
  userRole: string
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (
    product.seller.toString() !== userId &&
    userRole !== "admin"
  ) {
    throw new Error("Not authorized to delete this product");
  }

  await Product.findByIdAndDelete(productId);

  return { message: "Product deleted successfully" };
};