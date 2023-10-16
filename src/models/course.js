import { model, models, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    students: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    cr: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    announcements: {
      type: [Schema.Types.ObjectId],
      ref: "Announcement",
      default: [],
    },
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
      default: [],
    },
    bloodPosts: {
      type: [Schema.Types.ObjectId],
      ref: "BloodPost",
      default: [],
    },
    polls: {
      type: [Schema.Types.ObjectId],
      ref: "Poll",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Course = models?.Course || model("Course", courseSchema);
