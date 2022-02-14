import { User } from "../../db/model";
import hashPassword from "../helpers/hashPassword";
import ErrorResponse from "../MiddleWare/errorResponse";

// LOGIN

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide the password", 402));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("invalid Credentials", 404));
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse("invalid Credentials", 404));
    }
    req.session.user = {
      name: user.username,
      email: user.email,
      role: user.role,
    };
    res.json(req.session);

    res.send("Login is added");
  } catch (error) {
    next(error);
  }
};

// REGISTER

export const register = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (!email || !password || !username) {
    return next(new ErrorResponse("Please provide the valid creds", 402));
  }
  if (!role) {
    return next(new ErrorResponse("Please provide the Role", 402));
  }

  try {
    const user = await User.create({
      username,
      email,
      password: await hashPassword(password),
      role,
    });
    req.session.user = { name: username, email, role };
    res.json(req.session);
  } catch (error) {
    next(error);
  }
};

export const users = async (req, res, next) => {
  const users = await User.find({});
  res.send(users);
};
