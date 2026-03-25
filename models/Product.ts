import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description?: string;
  price: number;
  images: string[];
  category?: string;
  seller: mongoose.Types.ObjectId;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

const Product =
  models.Product || model<IProduct>("Product", productSchema);

export default Product;