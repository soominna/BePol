import User from "../models/user.js";

export const getUsername = async (userId) => {
  try {
    const { username } = await User.findById(userId, "username").exec();
    return username;
  } catch (err) {
    return null;
  }
};

export const findOrCreateUser = async (username, gender, age, code) => {
  try {
    const user = await User.findOne({ code });
    if (user) {
      return { created: false, doc: user };
    } else {
      await User.create({ username, gender, age, code });
      return { created: false, doc: user };
    }
  } catch (err) {
    return { created: false, doc: null };
  }
};
