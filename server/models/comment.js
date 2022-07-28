"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    contents: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.Object,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.Object,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Comment = mongoose.model("Comment", newSchema);
export default Comment;
