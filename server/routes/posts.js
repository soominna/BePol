import express from "express";
import * as voteController from "../controllers/posts/vote.js";

const router = express.Router();

router.post("/vote/:postId", voteController.voteToPost);

router.delete("/vote/:postId", voteController.voteDeleteToPost);

export default router;