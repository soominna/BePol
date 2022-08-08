import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/database.js";
import config from "./config/config.js";
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import commentRouter from "./routes/comments.js";
import cron from "node-cron";
import { sendMailStats } from "./services/sendMailStats.js";
import * as postRepsitory from "./services/post.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);

app.use("/", (req, res, next) => {
  res.send("API Server!!");
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

const port = config.port || 4000;
connectDb();

app.listen(port, () => {
  console.log(`SERVER Started on ${port} port`);
});

// hot3 게시판 매일 23시 59분에 업데이트 자동화 설정
cron.schedule("59 23 1-31 * *", async () => {
  await postRepsitory.setThreePopularPosts();
});

await sendMailStats();
