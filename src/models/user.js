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
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
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
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "cr", "user"],
      default: "user",
    },
    personalInformation: {
      phone: {
        type: String,
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
    },
    profileInformation: {
      profilePicture: {
        type: String,
      },
      coverPhoto: {
        type: String,
      },
      badges: {
        type: String,
        enum: ["none"],
        default: "none",
      },
      restrictions: [
        {
          type: {
            type: String,
            enum: ["post", "comment", "react"],
            default: "none",
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
      discussions: {
        type: [Schema.Types.ObjectId],
        ref: "Discusssion",
      },
      announcements: {
        type: [Schema.Types.ObjectId],
        ref: "Announcement",
      },
      tasks: {
        type: [Schema.Types.ObjectId],
        ref: "Task",
      },
      bloodPosts: {
        type: [Schema.Types.ObjectId],
        ref: "BloodPost",
      },
      polls: {
        type: [Schema.Types.ObjectId],
        ref: "Poll",
      },
    },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", userSchema);
