import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  language: { type: String, default: "javascript" },
  content: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now },
});

const versionSchema = new mongoose.Schema({
  label: { type: String },
  files: [fileSchema],
  savedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["viewer", "editor"], default: "editor" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    files: [fileSchema],
    versions: [versionSchema],
    language: { type: String, default: "javascript" },
    isPublic: { type: Boolean, default: false },
    roomId: {
      type: String,
      unique: true,
      default: function () {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
      },
    },
  },
  { timestamps: true }
);

// index for fast room lookups during socket events
projectSchema.index({ roomId: 1 });
projectSchema.index({ owner: 1 });

const Project = mongoose.model("Project", projectSchema);
export default Project;