import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/database.js";
import config from "./config/config.js";
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import commentRouter from "./routes/comments.js";
import cron from "node-cron";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketServer } from "./controllers/socket.js";
import * as postRepsitory from "./services/post.js";
dotenv.config();

const app = express();

const server = createServer(app);

const io = new Server(server);
io.on("connection", (socket) => socketServer(socket, io));

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

server.listen(port, () => {
  console.log(`SERVER Started on ${port} port`);
});

cron.schedule("59 23 1-31 * *", async () => {
  await postRepsitory.setThreePopularPosts();
});
