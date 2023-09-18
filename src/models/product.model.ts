import mongoose, { Document, Schema } from 'mongoose';

// Define the product schema
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Create a Mongoose schema for the product
const productSchema = new Schema<Product & Document>({
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
});

// Create and export the Product model
const ProductModel = mongoose.model<Product & Document>('Product', productSchema);

export default ProductModel;
