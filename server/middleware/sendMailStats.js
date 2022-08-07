import Post from "../models/post.js";
import User from "../models/user.js";
import { transport } from "../config/mail.transport.js";
import dotenv from "dotenv";
dotenv.config();

const { sendEmailUser, sendEmailPassword } = process.env;

/**
 * 기능: 투표 현황 이메일 전송 기능
 * 작성자: 이승연
 * 📌 발의문 마감일에 투표율, 찬성율, 반대율 등 투표 현황 리포트 이메일로 전송
 * 📌 node-mailer로 이메일 전송 기능 구현 ✔︎
 * 📌 node-mailer 파일 첨부 구현 (따로 다운 받지 않고 바로 화면으로 보일수 있게)
 * 📈 투표 현황 알고리즘 ✔︎
 */

/** Logic
 * 1. 발의문들 중 투표가 30표 이상 진행된 것들 필터링 ✔︎
 * 2. 해당 발의문의 작성자 이메일 찾기 (User collection) ✔︎
 * 3. 해당 발의문 투표 통계 페이지 (client) 캡쳐 기능 - puppeteer 사용
 * 4. 캡쳐한 화면을 node-mailer에서 attachment 옵션으로 보내기
 *
 */

export const sendMailStats = async () => {
  try {
    let thirtyPercentOverPosts = [];
    const postsList = await Post.find(
      {},
      {
        _id: 1,
        username: 1,
        title: 1,
        agrees: 1,
        disagrees: 1,
        userId: 1,
        createdAt: 1,
      }
    );
    postsList.forEach((post) => {
      const { agrees, disagrees } = post;
      const voteSum = agrees + disagrees;
      if (voteSum >= 30) {
        thirtyPercentOverPosts.push(post);
      }
    });

    Promise.all(
      thirtyPercentOverPosts.map(async (post) => {
        const { userId, title } = post;
        console.log(post);
        const userData = await User.findOne({ _id: userId });
        if (userData) {
          const { username, email } = userData;
          const emailOptions = {
            from: sendEmailUser,
            to: email,
            subject: `${title}에 관한 청원 투표 현황입니다.`,
            html: `${username}님이 작성하신 ${title}에 관한 청원 투표 현황입니다.`,
          };

          transport.sendMail(emailOptions);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};
