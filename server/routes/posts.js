import express from "express";
import { upload } from "../middleware/upload.js";
import { checkAuth } from "../middleware/checkAuth.js";
import * as voteController from "../controllers/posts/vote.js";
import * as recordController from "../controllers/posts/record.js";
import * as postController from "../controllers/posts/posts.js";

const router = express.Router();

router.post("/", upload, postController.createPost);

router.delete("/:postId", postController.deletePost);

router.get("/:postId", postController.getPost);

router.post("/vote/:postId", voteController.voteToPost);

router.delete("/vote/:postId", voteController.voteDeleteToPost);

router.get("/record/:postId", recordController.getVoteStatistics);

router.get("/", postController.getPostsList);

router.get("/popular", postController.getThreePopularPostsList);

router.get("/download/:postId", postController.downloadFile);

export default router;