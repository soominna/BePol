import { usernames, userId, postId } from "./data.js";
import { mongoose } from "mongoose";

let timeSeriesData = [];

for (let i = 40; i > 0; i--) {
  let newDay = {
    contents: "동의합니다!",
    likes: 0,
    postId: mongoose.Types.ObjectId(postId[0]),
    userId: mongoose.Types.ObjectId(userId[i]),
    username: usernames[i],
    createdAt: new Date(),
  };
  timeSeriesData.push(newDay);
}
for (let i = 21; i > 0; i--) {
  let newDay = {
    contents: "동의합니다!",
    likes: 0,
    postId: mongoose.Types.ObjectId(postId[1]),
    userId: mongoose.Types.ObjectId(userId[i]),
    username: usernames[i],
    createdAt: new Date(),
  };
  timeSeriesData.push(newDay);
}
for (let i = 15; i > 0; i--) {
  let newDay = {
    contents: "동의합니다!",
    likes: 0,
    postId: mongoose.Types.ObjectId(postId[2]),
    userId: mongoose.Types.ObjectId(userId[i]),
    username: usernames[i],
    createdAt: new Date(),
  };
  timeSeriesData.push(newDay);
}

export const commentData = timeSeriesData;
