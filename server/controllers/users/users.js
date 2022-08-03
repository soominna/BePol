import axios from "axios";
import dotenv from "dotenv";
import * as userRepository from "../../Services/user.js";
import { encodeToken } from "../functions/authentication.js";
dotenv.config();

export const login = async (req, res) => {
  /**
   * 기능: 소셜로그인
   * 작성자: 나수민
   * 카카오 oauth 토큰 발급과 사용자 정보 요청
   */
  try {
    const response = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        code: req.body.code,
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      },
    });

    if (response) {
      const data = await axios({
        method: "post",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      if (data) {
        const { created, doc } = await userRepository.findOrCreateUser(
          data.kakao_account.profile.nickname,
          req.body.gender,
          req.body.age,
          data.data.id
        );

        if (doc) {
          const accessToken = encodeToken({ id: doc._id });
          res.header("access-token", `Bearer ${accessToken}`);

          const status = created ? 201 : 200;

          res.status(status).json({
            message: "Logged in successfully!",
            data: { id: doc._id, username: doc.username },
          });
        } else {
          res.sendStatus(500);
        }
      } else {
        res.status(401).json({ message: "Invalid access token" });
      }
    } else {
      res.status(401).json({ message: "Invalid authorization code" });
    }
  } catch {
    res.sendStatus(500);
  }
};

export const logout = (req, res) => {
  delete req.headers["access-token"];
  res.status(200).json({ message: "Logged out!!" });
};
