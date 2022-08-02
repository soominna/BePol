import mongoose from "mongoose";
import Comment from "../models/comment.js";
import * as commentLikeRepository from "./commentLike.js";

export const createComment = (
  contents,
  postId,
  userId,
  username,
  cb,
  errcb
) => {
  Comment.create(
    {
      contents,
      postId: mongoose.Types.ObjectId(postId),
      userId: mongoose.Types.ObjectId(userId),
      username,
    },
    (err, doc) => {
      if (err) errcb(err);
      else {
        const { postId, userId, updatedAt, __v, ...commentInfo } =
          doc.toObject();

        cb(commentInfo);
      }
    }
  );
};

export const modifyComment = async (userId, commentId, contents) => {
  try {
    return await Comment.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(commentId),
        userId: mongoose.Types.ObjectId(userId),
      },
      { contents },
      { new: true }
    );
  } catch (err) {
    return null;
  }
};

export const deleteComment = async (userId, commentId) => {
  try {
    return await Comment.findOneAndDelete({
      _id: mongoose.Types.ObjectId(commentId),
      userId: mongoose.Types.ObjectId(userId),
    });
  } catch (err) {
    return null;
  }
};

export const getCommentList = async (userId, postId, sortby, page) => {
  try {
    const pageSize = 3;
    const sortOptions = sortby === "likes" ? { likes: -1 } : { createdAt: 1 };
    const commentList = await Comment.find({
      postId: mongoose.Types.ObjectId(postId),
    })
      .sort(sortOptions)
      .skip(pageSize * (Number(page ? page : 1) - 1))
      .limit(pageSize)
      .exec();

    if (!userId) return commentList;

    console.log(commentList);

    return Promise.all(
      commentList.map(async (comment) => {
        const commentLike = await commentLikeRepository.getCommentLike(
          comment._id,
          userId
        );
        return commentLike ? { ...comment.toObject(), isliked: true } : comment;
      })
    );
  } catch (err) {
    console.log(err);
  }
};
