import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userModel.js";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const createToken = (userId) => {
  const payload = {
    userId: userId,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, secretKey);

    const user = await User.findById(decoded.userId).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
