"use strict";
import mongoose from "mongoose";
import Post from "./post.js";

const newSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.Object,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.Object,
    required: true,
  },
  answer: {
    type: Boolean,
    required: true,
  },
});

const Post_answers = mongoose.model("Post_answers", newSchema);

export const getUserIdAnswered = async (userId) => {
  return Post_answers.findOne({ userId });
}

export const addAnswer = async (postId, userId, agree) => {
  /**
   * 기능: Post_answer collection에 
   */
  return Post_answers.create({
    id: postId + userId,
    postId,
    userId,
    answer: agree
  });
}

export const addAgrees = async (postId) => {
  return Post.findOne({ id: postId }, { userId: false })
    .then(post => {
      post.agrees++;
      return post.save();
    });
}

export const addDisagrees = async (postId) => {
  return Post.findOne({ id: postId }, { userId: false })
    .then(post => {
      post.disagrees++;
      return post.save();
    })
}

export const deleteAnswer = async (postId, userId) => {
  return Post_answers.deleteOne({ id: postId + userId })
}

export const substractAgrees = async (postId) => {
  return Post.findOne({ id: postId }, { userId: false })
    .then(post => {
      post.agrees--;
      return post.save();
    });
}

export const substractDisagrees = async (postId) => {
  return Post.findOne({ id: postId }, { userId: false })
    .then(post => {
      post.disagrees--;
      return post.save();
    });
}

export default Post_answers;
