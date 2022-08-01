import axios from "axios";
import dotenv from "dotenv";
import User from "../../models/user.js";
import { findOrCreate } from "../functions/model.js";
import { encodeToken } from "../functions/authentication.js";
dotenv.config();

export default {
  login: async (req, res) => {
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
          method: "get",
          url: "https://www.googleapis.com/oauth2/v3/userinfo",
          headers: {
            accept: "application/json",
          },
          params: { access_token: response.data.access_token },
        });

        if (data) {
          const { created, doc } = findOrCreate(
            User,
            { code: data.data.id },
            {
              username: data.kakao_account.profile.nickname,
              gender: req.body.gender,
              age: req.body.age,
              code: data.data.id,
            }
          );

          if (doc) {
            const accessToken = encodeToken({ id: doc._id });
            res.header("access-token", `Bearer ${accessToken}`);

            const status = created ? 201 : 200;

            res.status(status).send({
              message: "Logged in successfully!",
              data: { id: doc._id, username: doc.username },
            });
          } else {
            res.sendStatus(500);
          }
        } else {
          res.status(401).send({ message: "Invalid access token" });
        }
      } else {
        res.status(401).send({ message: "Invalid authorization code" });
      }
    } catch {
      res.sendStatus(500);
    }
  },
  logout: (req, res) => {
    delete req.headers["access-token"];
    res.status(200).send({ message: "Logged out!!" });
  },
};
