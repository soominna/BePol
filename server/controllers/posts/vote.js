import * as postAnswerRepository from "../../models/postAnswer.js";

export const voteToPost = async (req, res, next) => {
    /**
     * 기능: 발의문 찬반투표 & 투표 취소 기능
     * 작성자: 이승연
     * 📌 투표 기능 ✔︎
     * 📌 투표 취소 기능 ✔︎
     * postAnswer에 이미 찬성이나 반대를 누른 유저 o (user_id 비교)
     * >> 같은거(찬성 -> 찬성) 한번 더 누르면 취소 ✔︎
     * >> 반대거(찬성 -> 반대) 한번 더 누르면 변경 ✔︎
     * 📌 게시물 agrees, disagrees 반영
     */

    /**
     * agree === false -> 반대
     * agree === true -> 찬성
     */
    const { agree } = req.body;
    const { accesstoken } = req.headers;
    const { postId } = req.params;
    const userId = "62e1eb6f6cc8d5e6d3bfac2d"; // 소셜로그인 구현되면 변경

    if (!accesstoken) { // 소셜로그인 구현되면 변경
        res.status(401).json({
            message: "Unauthorized user",
        });
    }

    const userIdAnswered = await postAnswerRepository.getUserIdAnswered(userId, agree);

    if (userIdAnswered) { // 재투표
        if (userIdAnswered.answer === agree) { // 같은거 또 누른 경우 (찬성 -> 찬성)
            await postAnswerRepository.deleteAnswer(userId);

            return res.status(204).send("deleted");
        } else { // 다른 거 또 누른 경우 (찬성 -> 반대)
            const changedAnswer = await postAnswerRepository.changeAnswer(agree, userId);

            return res.status(201).json({
                message: "Vote is changed to the other option successfully",
                agree: changedAnswer.answer
            })
        }
    } else { // 첫 투표
        const data = await postAnswerRepository.addAnswer(postId, userId, agree);

        return res.status(201).json({
            message: "Voted successfully",
            "agree": data.answer,
        });
    }
}