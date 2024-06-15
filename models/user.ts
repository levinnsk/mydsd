import mongoose from "mongoose";
import validator from "validator";

interface IUsers {
  firstname: string;
  patronymic: string;
  lastname: string;
  mobilePhone: string;
  email: string;
  dateSignUp: Date;
  mobilePhoneVerify: Date;
  emailVerified: Date;
}
mongoose.connect(process.env.MONGODB_URI!);

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema<IUsers>({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 35,
  },
  patronymic: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 35,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 35,
  },
  mobilePhone: {
    type: String,
    required: true,
    unique: true,
    length: 12,
    validate: {
      validator(tel: string) {
        return /(\+7)(\d{10})/.test(tel);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  dateSignUp: {
    type: Date,
    default: Date.now,
    select: false, // чтобы не возвращался
  },
  mobilePhoneVerify: {
    type: Date || undefined,
    default: undefined,
  },
  emailVerified: {
    type: Date || undefined,
    default: undefined,
  },
});

const UserModel =
  mongoose.models?.User || mongoose.model<IUsers>("User", userSchema);
export default UserModel;
