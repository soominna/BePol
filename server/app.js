import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/database.js";
import config from "./config/config.js";
import postsRouter from './routes/posts.js';
import userRouter from "./routes/users.js";
import commentRouter from "./routes/comments.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);

app.use("/user", userRouter);
app.use("/comment", commentRouter);

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
