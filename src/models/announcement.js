import { model, models, Schema } from "mongoose";

const announcementSchema = new Schema(
  {
    type: {
      type: String,
      default: "announcement",
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
  },
  { timestamps: true }
);

export const Announcement =
  models?.Announcement || model("Announcement", announcementSchema);
