import { model, models, Schema } from "mongoose";

const tempUserSchema = new Schema(
  {
    username: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export const TempUser = models?.TempUser || model("TempUser", tempUserSchema);
