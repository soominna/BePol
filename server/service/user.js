import User from "../models/user.js";

export const getUsername = async (userId) => {
  try {
    const { username } = await User.findById(userId, "username").exec();
    return username;
  } catch (err) {
    return null;
  }
};
