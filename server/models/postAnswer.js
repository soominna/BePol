"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema({
  id: {
    type: String,
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
  answer: {
    type: Boolean,
    required: true,
  },
});

const Post_answers = mongoose.model("Post_answers", newSchema);

export const getUserIdAnswered = async (userId, agree) => {
  return Post_answers.findOne({ user_id: userId });
  
}

export const deleteAnswer = async (userId) => {
  return Post_answers.deleteOne({ user_id: userId });
}

export const changeAnswer = async (agree, userId) => {
  await Post_answers.updateOne({ user_id: userId }, { answer: agree })
  
  return Post_answers.findOne({ user_id: userId });
}

export const addAnswer = async (postId, userId, agree) => {
  return Post_answers.create({
    id: postId + userId,
    post_id: postId,
    user_id: userId,
    answer: agree
  });
}

export default Post_answers;
