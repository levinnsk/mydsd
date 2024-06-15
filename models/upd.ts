import mongoose from "mongoose";
import { number } from "zod";

interface IUpds {
  location: string;
  manufacture: string;
  model: string;
  type: string;
  imei: number;
  owner: Object; //уточнить!!
  status: boolean;
}
mongoose.connect(process.env.MONGODB_URI!);

mongoose.Promise = global.Promise;

const updSchema = new mongoose.Schema<IUpds>({
  location: {
    type: String,
    required: true,
  },
  manufacture: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  imei: {
    type: Number,
    unique: true,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const UpdModel =
  mongoose.models?.Upd || mongoose.model<IUpds>("Upd", updSchema);
export default UpdModel;
