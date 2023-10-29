import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "cr", "user"],
      default: "user",
    },
    phone: {
      type: [String],
    },
    currentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    isDonor: {
      type: Boolean,
      default: false,
    },
    studentId: {
      type: String,
    },
    batch: {
      type: String,
    },
    courses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
    },
    coursesCount: {
      type: Number,
      default: 0,
    },
    maxCourse: {
      type: Number,
      default: 1,
    },
    profilePicture: {
      type: String,
      default: "profile-avatar.jpg",
    },
    coverPhoto: {
      type: String,
    },
    badges: {
      type: [String],
      enum: [
        "cr",
        "moderator",
        "admin",
        "donor",
        "magnet",
        "commentator",
        "liker",
        "popular",
      ],
      default: [],
    },
    restrictions: {
      type: [Schema.Types.ObjectId],
      ref: "Restriction",
    },
    reports: {
      type: [Schema.Types.ObjectId],
      ref: "Report",
    },
    reportsCount: {
      type: Number,
      default: 0,
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
    },
    postsCount: {
      type: Number,
      default: 0,
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", userSchema);
