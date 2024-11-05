import mongoose from "mongoose";

export interface IElement extends mongoose.Document{
  name: string;
  alias: string;
  imgOne: string;
  imgTwo: string;
  imgThree: string;
  imgFour: string;
};

const ElementSchema = new mongoose.Schema({
  name: { type: String, require: true },
  alias: { type: String, default: "" },
  imgOne: { type: String, default: ""},
  imgTwo: { type: String, default: "" },
  imgThree: { type: String, default: "" },
  imgFour: { type: String, default: "" },
});

export default mongoose.model<IElement>("Element", ElementSchema);