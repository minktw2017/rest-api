import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  category: [mongoose.Types.ObjectId];
};

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

export default mongoose.model<IUser>("User", UserSchema);