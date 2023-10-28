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
    name: {
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
    },
    email: {
      address: {
        type: String,
        required: true,
        unique: true,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "cr", "user"],
      default: "user",
    },
    personalInformation: {
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
    },
    studentInformation: {
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
      maxCourse: {
        type: Number,
        default: 1,
      },
    },
    profileInformation: {
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
      restrictions: [
        {
          type: {
            type: [String],
            enum: ["post", "comment", "react"],
            default: [],
          },
          time: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      reports: {
        type: [Schema.Types.ObjectId],
        ref: "Report",
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
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
    },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", userSchema);
