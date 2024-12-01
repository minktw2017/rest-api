import mongoose from "mongoose";

export interface IAct extends mongoose.Document {
  sn: string;
  title: string;
  imagepath: string;
  filepath: string;
  views: number,
  likes: number
};

const ActSchema = new mongoose.Schema({
  sn: { type: String, require: true },
  title: { type: String },
  imagepath: { type: String },
  filepath: { type: String },
  views: { type: Number, default: 1 },
  likes: { type: Number, default: 1 },
});

export default mongoose.model<IAct>("Act", ActSchema);