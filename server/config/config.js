import dotenv from "dotenv";
dotenv.config();

export default {
  database: {
    url: process.env.DATABASE_URL,
    name: "bepol",
    options: {
      useNewUrlParser: true,
    },
  },
};
