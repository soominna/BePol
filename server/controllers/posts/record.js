import * as postAnswerRepository from "../../services/postAnswer.js";

/**
 * 기능: 통계 결과 조회
 * postId에 있는 통계 찾아서 조회
 */
export const getVoteStatistics = async (req, res) => {
  const { postId } = req.params;

  // Post_statistics에서 postId에 맞는 데이터 전체 조회
  const data = await postAnswerRepository.getPostStatistics(postId);

  if (!data) {
    return res.status(404).json({
      message: "This post doesn't exist",
    });
  } else {
    return res.status(200).json({
      data,
    });
  }
};