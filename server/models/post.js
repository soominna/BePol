"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      default: [],
    },
    purport: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    attachments: {
      type: Array,
      default: [],
    },
    agrees: {
      type: Number,
      default: 0,
      required: true,
    },
    disagrees: {
      type: Number,
      default: 0,
      required: true,
    },
    comments: {
      type: Number,
      default: 0,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

const Post = mongoose.model("Post", newSchema);
export default Post;
