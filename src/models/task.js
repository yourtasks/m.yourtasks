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
    seenCount: {
      type: Number,
      default: 0,
    },

    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    shares: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    sharesCount: {
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
    hasCompleted: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Task = models?.Task || model("Task", taskSchema);
