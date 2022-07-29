import express from "express";
import users from "../controllers/users/users.js";
const router = express.Router();

router.post("/login", users.login);
router.post("/logout", users.logout);

export default router;
