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
    dislikes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    reports: {
      type: [Schema.Types.ObjectId],
      ref: "Report",
    },
  },
  { timestamps: true }
);

export const Comment = models?.Comment || model("Comment", commentSchema);
