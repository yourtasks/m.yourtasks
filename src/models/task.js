import { model, models, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    type: {
      type: String,
      default: "task",
    },
    source: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
    },
    seen: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
    shares: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    reports: {
      type: [Schema.Types.ObjectId],
      ref: "Report",
    },
    hasCompleted: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Task = models?.Task || model("Task", taskSchema);
