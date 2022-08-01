import express from "express";
import * as commentController from "../controllers/comments/comments.js";
import * as likeController from "../controllers/comments/likes.js";
const router = express.Router();

router.get("/:postId", commentController.getComments);
router.post("/:postId", commentController.postComment);
router.patch("/:commentId", commentController.patchComment);
router.delete("/:commentId", commentController.deleteComment);
router.post("/likes/:commentId", likeController.postLike);
router.delete("/likes/:commentId", likeController.deleteLike);

export default router;
