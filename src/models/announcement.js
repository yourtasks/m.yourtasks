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
  },
  { timestamps: true }
);

export const Announcement =
  models?.Announcement || model("Announcement", announcementSchema);
