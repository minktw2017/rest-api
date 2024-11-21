import mongoose from "mongoose";

export interface IPara extends mongoose.Document {
  views: number
};

const ParaSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
});

export default mongoose.model<IPara>("Para", ParaSchema);