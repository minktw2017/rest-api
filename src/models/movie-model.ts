import mongoose from "mongoose";

export interface IMovie extends mongoose.Document{
  name: string;
  category: [mongoose.Types.ObjectId];
  actress: [string];
  movieURL: string;
  sn: string;
  available: boolean;
  thumbURL: string;
  views: number;
  likes: number;
};

const MovieSchema = new mongoose.Schema({
  name: { type: String, require: true },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  actress: { type: [String] },
  movieURL: { type: String, require: true },
  sn: { type: String, require: true },
  available: { type: Boolean, default: true },
  thumbURL: { type: String },
  views: { type: String },
  likes: { type: String },
});

export default mongoose.model<IMovie>("Movie", MovieSchema);