"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.Object,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.Object,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const CommentLike = mongoose.model("CommentLike", newSchema);
export default CommentLike;
