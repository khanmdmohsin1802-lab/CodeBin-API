import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);

snippetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const Snippet = mongoose.model("snippet", snippetSchema);

export default Snippet;
