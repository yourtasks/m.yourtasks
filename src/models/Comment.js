import { model, models, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["announcement", "task", "post", "bloodpost", "vote"],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    source: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    dislikesCount: {
      type: Number,
      default: 0,
    },
    reports: {
      type: [Schema.Types.ObjectId],
      ref: "Report",
    },
    reportsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Comment = models?.Comment || model("Comment", commentSchema);
