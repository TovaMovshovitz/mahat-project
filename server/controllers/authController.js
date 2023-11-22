const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.user;

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //TODO: check the email
  try {
    const duplicate = await User.findOne({ where: { email: email } });
    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Your email is associated with an existing account" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const userObject = { name, email, password: hashedPwd };
    const user = await User.create(userObject);

    if (user) {
      return res.status(201).json({ user });
    } else {
      return res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const foundUser = await User.findOne({ where: { email: email } });
    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userInfo = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
    };
    //Create the token
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.json({ accessToken, user: userInfo });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register };
