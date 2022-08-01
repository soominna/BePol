"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    male: {
      10: {
        type: Number,
        default: 0,
        required: true,
      },
      20: {
        type: Number,
        default: 0,
        required: true,
      },
      30: {
        type: Number,
        default: 0,
        required: true,
      },
      40: {
        type: Number,
        default: 0,
        required: true,
      },
      50: {
        type: Number,
        default: 0,
        required: true,
      },
      60: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    female: {
      10: {
        type: Number,
        default: 0,
        required: true,
      },
      20: {
        type: Number,
        default: 0,
        required: true,
      },
      30: {
        type: Number,
        default: 0,
        required: true,
      },
      40: {
        type: Number,
        default: 0,
        required: true,
      },
      50: {
        type: Number,
        default: 0,
        required: true,
      },
      60: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const Post_statistics = mongoose.model("Post_statistics", newSchema);
export default Post_statistics;
