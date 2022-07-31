import * as postAnswerRepository from "../../models/postAnswer.js";

export const voteToPost = async (req, res, next) => {
    /**
     * 기능: 발의문 찬반투표 & 투표 취소 기능
     * 작성자: 이승연
     * 📌 투표 기능 ✔︎
     * 📌 게시물 agrees, disagrees 반영 ✔︎
     * 📌 예외 처리 - unauthorized user, 이미 투표한 사람 ✔︎
     * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
     */

    /**
     * agree === false -> 반대
     * agree === true -> 찬성
     */
    const { agree } = req.body;
    const { accesstoken } = req.headers;
    const { postId } = req.params;
    const userId = "62e1eb6f6cc8d5e6d3bfac2d"; // 소셜로그인 구현되면 변경

    if (!accesstoken) { // user 정보 불일치시 error
        res.status(401).json({
            message: "Unauthorized user",
        });
    }

    const votedUser = await postAnswerRepository.getUserIdAnswered(userId);

    if (votedUser) { // 이미 투표한 경우
        return res.status(403).json({
            message: "Already voted user!",
        });
    }

    const data = await postAnswerRepository.addAnswer(postId, userId, agree);

    if (data) {
        // post collection - agrees, disagrees 적용
        await (
            agree === true ?
            postAnswerRepository.addAgrees(postId) :
            postAnswerRepository.addDisagrees(postId)
        );

        return res.status(201).json({
            message: "Voted successfully",
            "agree": data.answer,
        });
    }
}

export const voteDeleteToPost = async (req, res, next) => {
    /**
     * 기능: 찬반투표 취소
     * 작성자: 이승연
     * 📌 투표 취소 기능 ✔︎
     * 📌 게시물 agrees, disagrees 반영 ✔︎
     * 📌 예외 처리 - unauthorized user, postAnser 컬렉션에 해당 유저가 없는 사람 (투표 안함) ✔︎
     * 📌 로그인 적용 ❌ (소셜로그인 부분 merge 후 진행할 계획!)
     */

    const { agree } = req.body;
    const { accesstoken } = req.headers;
    const { postId } = req.params;
    const userId = "62e1eb6f6cc8d5e6d3bfac2d"; // 소셜로그인 구현되면 변경

    if (!accesstoken) { // user 정보 불일치시 error
        res.status(401).json({
            message: "Unauthorized user",
        });
    }

    const votedUser = await postAnswerRepository.getUserIdAnswered(userId);

    if (!votedUser) { // 투표 안한 경우
        return res.status(403).json({
            message: "No vote record of this user!!",
        });
    }

    await postAnswerRepository.deleteAnswer(postId, userId);

    await (
        agree === true ?
        postAnswerRepository.substractAgrees(postId) :
        postAnswerRepository.substractDisagrees(postId)
    );

    return res.status(200).json({
        message: "Vote is deleted!!",
    })
}