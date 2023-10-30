import { model, models, Schema } from "mongoose";

const tokenSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["create", "forgot-password"],
      default: "create",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    code: {
      type: String,
      required: true,
    },
    resent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Token = models?.Token || model("Token", tokenSchema);
