"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    comment_id: {
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
    },
  }
);

const User = mongoose.model("User", newSchema);
export default User;
