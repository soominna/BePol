"use strict";
import mongoose from "mongoose";

const newSchema = mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    male10: {
      type: Number,
      default: 0,
      required: true,
    },
    male20: {
      type: Number,
      default: 0,
      required: true,
    },
    male30: {
      type: Number,
      default: 0,
      required: true,
    },
    male40: {
      type: Number,
      default: 0,
      required: true,
    },
    male50: {
      type: Number,
      default: 0,
      required: true,
    },
    male60: {
      type: Number,
      default: 0,
      required: true,
    },
    female10: {
      type: Number,
      default: 0,
      required: true,
    },
    female20: {
      type: Number,
      default: 0,
      required: true,
    },
    female30: {
      type: Number,
      default: 0,
      required: true,
    },
    female40: {
      type: Number,
      default: 0,
      required: true,
    },
    female50: {
      type: Number,
      default: 0,
      required: true,
    },
    female60: {
      type: Number,
      default: 0,
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
