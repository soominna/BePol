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

export const addAgrees = async (postId) => {
  return Post.findOne({ _id: postId }, { user_id: false })
    .then(post => {
      post.agrees++;
      return post.save();
    });
}

export const addDisagrees = async (postId) => {
  return Post.findOne({ _id: postId }, { user_id: false })
    .then(post => {
      post.disagrees++;
      return post.save();
    })
}

export const substractAgrees = async (postId) => {
  return Post.findOne({ _id: postId }, { user_id: false })
    .then(post => {
      post.agrees--;
      return post.save();
    });
}

export const substractDisagrees = async (postId) => {
  return Post.findOne({ _id: postId }, { user_id: false })
    .then(post => {
      post.disagrees--;
      return post.save();
    });
}

const Post = mongoose.model("Post", newSchema);
export default Post;
