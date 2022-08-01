import * as commentLikeRepository from "../../service/commentLike.js";

export const postLike = async (req, res) => {
  /**
   * 기능: 댓글 공감
   * 작성자: 나수민
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   * 트랜잭션 처리
   */

  const userId = "62e209aa1e2cdd5ad2280f81"; //토큰 해독해서 불러오게 수정할 것

  const commentLike = await commentLikeRepository.getCommentLike(
    req.params.commentId,
    userId
  );

  if (!commentLike) {
    const updatedComment = await commentLikeRepository.commentLikeTransaction(
      req.params.commentId,
      userId
    );

    if (updatedComment)
      res.status(201).send({ likesCount: updatedComment.likes });
    else res.sendStatus(500);
  } else res.status(409).send({ message: "You already liked the comment" });
};

export const deleteLike = async (req, res) => {
  /**
   * 기능: 댓글 공감 취소
   * 작성자: 나수민
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   * 트랜잭션 처리
   */
  const userId = "62e209aa1e2cdd5ad2280f81"; //토큰 해독해서 불러오게 수정할 것

  try {
    const updatedComment =
      await commentLikeRepository.commentLikeCancelTransaction(
        req.params.commentId,
        userId
      );

    if (updatedComment) res.sendStatus(204);
    else res.sendStatus(500);
  } catch {
    res.sendStatus(500);
  }
};
