import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./db/database.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

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

const port = process.env.PORT || 4000;
connectDb();

app.listen(port, () => {
  console.log(`SERVER Started on ${port} port`);
});
