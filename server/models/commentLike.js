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

const User = mongoose.model("User", newSchema);
export default User;
