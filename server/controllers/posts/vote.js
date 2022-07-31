import * as postAnswerRepository from "../../models/postAnswer.js";

export const voteToPost = async (req, res, next) => {
  /**
   * 기능: 발의문 찬반투표 & 투표 취소 기능
   * 작성자: 이승연
   * 📌 투표 기능 ✔︎
   * 📌 게시물 agrees, disagrees 반영 ✔︎
   * 📌 예외 처리 - unauthorized user, 이미 투표한 사람 ✔︎
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   * 📌 트랜잭션 처리
   */

  /**
   * agree === false -> 반대
   * agree === true -> 찬성
   */
  const { agree } = req.body;
  const { accesstoken } = req.headers;
  const { postId } = req.params;
  const userId = "62e1eb6f6cc8d5e6d3bfac2d"; // 소셜로그인 구현되면 변경
  const votedUser = await postAnswerRepository.getUserIdAnswered(userId);

  if (!accesstoken) {
    // user 정보 불일치시 error
    return res.status(401).json({
      message: "Unauthorized user",
    });
  } else if (votedUser) {
    // 이미 투표한 경우
    return res.status(403).json({
      message: "Already voted user!",
    });
  } else {
    postAnswerRepository.addAnswerTransaction(postId, userId, agree);

    return res.status(201).json({
      message: "Voted successfully",
    });
  }
};

export const voteDeleteToPost = async (req, res, next) => {
  /**
   * 기능: 찬반투표 취소
   * 작성자: 이승연
   * 📌 투표 취소 기능 ✔︎
   * 📌 게시물 agrees, disagrees 반영 ✔︎
   * 📌 예외 처리 - unauthorized user, postAnser 컬렉션에 해당 유저가 없는 사람 (투표 안함) ✔︎
   * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
   */

  /**
   * 해당 유저의 투표 기록을 취소
   * 1. postAnswer에서 해당 유저아이디에 일치하는 answer값 가져오기
   * 2. 이 answer값을 지우는것
   */
  const { accesstoken } = req.headers;
  const { postId } = req.params;
  const userId = "62e1eb6f6cc8d5e6d3bfac2d"; // 소셜로그인 구현되면 변경
  const userPostAnswer = await postAnswerRepository.findUserAnswer(userId);
  const { answer } = userPostAnswer;
  const votedUser = await postAnswerRepository.getUserIdAnswered(userId);

  if (!accesstoken) {
    // user 정보 불일치시 error
    res.status(401).json({
      message: "Unauthorized user",
    });
  } else if (!votedUser) {
    // 투표 안한 경우
    return res.status(403).json({
      message: "No vote record of this user!!",
    });
  } else {
    postAnswerRepository.deleteAnswerTransaction(postId, userId, answer);

    return res.status(200).json({
      message: "Vote is deleted!!",
    });
  }
};