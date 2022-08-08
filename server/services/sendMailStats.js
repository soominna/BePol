import Post from "../models/post.js";
import User from "../models/user.js";
import { transport } from "../config/mail.transport.js";
import puppeteer from "puppeteer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const { sendEmailUser } = process.env;

/**
 * 기능: 투표 현황 이메일 전송 기능
 * 작성자: 이승연
 * 📌 발의문 마감일에 투표율, 찬성율, 반대율 등 투표 현황 리포트 이메일로 전송 (client화면) ✔︎
 * 📌 통계 client부분 완성되면 제대로 연결 🔺
 * 📌 node-mailer로 이메일 전송 기능 구현 ✔︎
 * 📌 node-mailer 파일 첨부 및 Embedded 이미지 구현 ✔︎
 * 📈 투표 현황 알고리즘 ✔︎
 */

/** Logic
 * 1. 발의문들 중 투표가 30표 이상 진행된 것들 필터링 (마감 안된걸로) ✔︎
 * 2. 해당 발의문의 작성자 이메일 찾기 (User collection) ✔︎
 * 3. 해당 발의문 투표 통계 페이지 (client) 캡쳐 기능 - puppeteer 사용
 * 4. 캡쳐한 화면을 node-mailer에서 attachment 옵션으로 보내기 ✔︎
 * 5. 중복메일이 가지 않도록 Post 컬렉션의 sendEmailStatus가 false일 때만 메일가게 설정 ✔︎
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
        sendEmailStatus: 1,
      }
    );
    postsList.forEach((post) => {
      const { agrees, disagrees, createdAt } = post;
      const voteSum = agrees + disagrees;
      const date = new Date(createdAt);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const afterOneMonth = new Date(year, month + 1, day);

      if (voteSum >= 30 && afterOneMonth.getTime() > new Date().getTime()) {
        thirtyPercentOverPosts.push(post);
      }
    });

    Promise.all(
      thirtyPercentOverPosts.map(async (post) => {
        const { _id, userId, title, sendEmailStatus } = post;

        const userData = await User.findOne({ _id: userId });
        const fileName = fs.existsSync(`./imgs/stats${_id}.png`);
        if (userData) {
          const { username, email } = userData;

          const emailOptions = {
            from: sendEmailUser,
            to: email,
            subject: `안녕하세요. BePol입니다.`,
            html: `${username}님이 작성하신 ${title}에 관한 청원 투표 현황입니다.
              <br><br>
              <img src="cid:stats">
            `,
            attachments: [
              {
                filename: "stats.png",
                path: `imgs/stats${_id}.png`,
                cid: "stats",
              },
            ],
          };

          if (fileName && sendEmailStatus === false) {
            transport.sendMail(emailOptions).finally(async () => {
              await Post.updateOne({ _id }, { sendEmailStatus: true });
            });
          } else if (!fileName && sendEmailStatus === false) {
            puppeteer.launch().then(async (browser) => {
              return browser.newPage().then(async (page) => {
                return page
                  .goto("http://localhost:3000/write")
                  .then(async () => {
                    await page.screenshot({
                      fullPage: true,
                      path: `imgs/stats${_id}.png`,
                    });
                  })
                  .then(() => browser.close())
                  .then(transport.sendMail(emailOptions))
                  .finally(async () => {
                    await Post.updateOne({ _id }, { sendEmailStatus: true });
                  });
              });
            });
          }
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};
