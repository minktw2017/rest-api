import mongoose from "mongoose";

export interface ICategory extends mongoose.Document{
  name: string;
  slug: string;
  imageURL: string;
};

const CategorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  slug: { type: String, require: true },
  imageURL: { type: String, require: true },
});

export default mongoose.model<ICategory>("Category", CategorySchema);