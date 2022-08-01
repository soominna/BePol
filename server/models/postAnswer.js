"use strict";
import mongoose from "mongoose";
import pkg from "mongoose";
import Post from "./post.js";
const { startSession } = pkg;

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
};

export const addAnswer = async (postId, userId, agree) => {
  return Post_answers.create({
    id: postId + userId,
    postId,
    userId,
    answer: agree,
  });
};

export const addAgrees = async (postId) => {
  return Post.findOne({ id: postId }, { userId: false }).then((post) => {
    post.agrees++;
    return post.save();
  });
};

export const addDisagrees = async (postId) => {
  return Post.findOne({ id: postId }, { userId: false }).then((post) => {
    post.disagrees++;
    return post.save();
  });
};

export const addAnswerTransaction = async (postId, userId, agree) => {
  /**
   * 투표 반영 -> Post, Post_answer
   */
  const session = await startSession();
  try {
    session.startTransaction();

    const answer = await addAnswer(postId, userId, agree);
    const agrees = await (agree === true ? addAgrees(postId) : addDisagrees(postId));

    await session.commitTransaction();
    session.endSession();
    return answer, agrees;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
  }
};

export const findUserAnswer = async (userId) => {
  return Post_answers.findOne({ userId });
};

export const deleteAnswer = async (postId, userId) => {
  return Post_answers.deleteOne({ id: postId + userId });
};

export const substractAgrees = async (postId) => {
  return Post.findOne({ id: postId }, { userId: false }).then((post) => {
    post.agrees--;
    return post.save();
  });
};

export const substractDisagrees = async (postId) => {
  return Post.findOne({ id: postId }, { userId: false }).then((post) => {
    post.disagrees--;
    return post.save();
  });
};

export const deleteAnswerTransaction = async (postId, userId, answer) => {
  /**
   * 투표 취소 반영 -> Post, Post_answer
   */
  const session = await startSession();
  try {
    session.startTransaction();

    const answer = await deleteAnswer(postId, userId);
    const agree = await (answer === true ? substractAgrees(postId) : substractDisagrees(postId));

    await session.commitTransaction();
    session.endSession();
    return answer, agree;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
  }
};

export default Post_answers;