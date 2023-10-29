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
    studentsCount: {
      type: Number,
      default: 0,
    },
    cr: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    crCount: {
      type: Number,
      default: 0,
    },
    announcements: {
      type: [Schema.Types.ObjectId],
      ref: "Announcement",
      default: [],
    },
    announcementsCount: {
      type: Number,
      default: 0,
    },
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: "Task",
      default: [],
    },
    tasksCount: {
      type: Number,
      default: 0,
    },
    polls: {
      type: [Schema.Types.ObjectId],
      ref: "Poll",
      default: [],
    },
    pollsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = models?.Course || model("Course", courseSchema);
