import mongoose from "mongoose";

export interface IContent extends mongoose.Document{
  title: string;
  desc: string;
}

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
});

export default mongoose.model<IContent>("Content", ContentSchema);