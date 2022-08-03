import * as commentRepository from "../../Services/comment.js";
import * as userRepository from "../../Services/user.js";

export const postComment = async (req, res) => {
  /**
   * 기능: 댓글 작성
   * 작성자: 나수민
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   */
  const userId = "62e209aa1e2cdd5ad2280f81"; //access token 해독해서 사용할 예정.
  try {
    const username = await userRepository.getUsername(userId);

    commentRepository.createComment(
      req.body.commentContent,
      req.params.postId,
      userId,
      username,
      (newComment) => {
        res.status(201).json({ data: newComment });
      },
      (err) => {
        res.status(500).json(err);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

export const patchComment = async (req, res) => {
  /**
   * 기능: 댓글 수정
   * 작성자: 나수민
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   */
  const userId = "62e209aa1e2cdd5ad2280f81"; //access token 해독해서 사용할 예정
  try {
    const updatedComment = await commentRepository.modifyComment(
      userId,
      req.params.commentId,
      req.body.commentContent
    );

    if (updatedComment) {
      res.json({
        message: "Comment modified!",
        data: {
          comment: updatedComment.contents,
        },
      });
    } else {
      res.status(500).json();
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteComment = async (req, res) => {
  /**
   * 기능: 댓글 삭제
   * 작성자: 나수민
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   */
  const userId = "62e209aa1e2cdd5ad2280f81";

  const deletedComment = await commentRepository.deleteComment(
    userId,
    req.params.commentId
  );

  if (deletedComment) res.status(204).json();
  else res.sendStatus(500);
};

export const getComments = async (req, res) => {
  /**
   * 기능: 댓글 목록 조회
   * 작성자: 나수민
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   * 📌 시드 데이터 추가한 후 다시 성능 테스트 필요
   * 추후 수정을 위해 refer : https://stackoverflow.com/questions/28105009/implementing-pagination-in-mongodb
   */

  const userId = "62e209aa1e2cdd5ad2280f81"; //access token 해독해서 사용할 예정

  try {
    const commentList = await commentRepository.getCommentList(
      userId,
      req.params.postId,
      req.query.sortby,
      req.query.page
    );

    res.json({ data: commentList });
  } catch {
    res.sendStatus(500);
  }
};
