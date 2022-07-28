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
export default Post_answers;
