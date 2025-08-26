import bcrypt from "bcryptjs";
import { createToken } from "../config/jwt.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  userRegisterPage = async (userData) => {
    try {
      const { email, password, username } = userData;

      const existingUser = await this.userRepository.findOneByEmail(email);
      if (existingUser) {
        throw new Error("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        username,
        email,
        password: hashedPassword,
      };

      await this.userRepository.userRegisterPage(newUser);
    } catch (error) {
      throw error;
    }
  };

  userLogin = async ({ email, password }) => {
    try {
      const user = await this.userRepository.findOneByEmail(email);
      if (!user) {
        throw new Error("No user found with this email");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = createToken(user._id);
      const userObj = user.toObject();
      delete userObj.password;

      return { token, user: userObj };
    } catch (error) {
      throw error;
    }
  };

  updateUserStatus = async (userId, status) => {
    try {
      return await this.userRepository.updateUserStatus(userId, status);
    } catch (error) {
      throw error;
    }
  };

  findAllUsers = async (userId) => {
    try {
      return await this.userRepository.findAllUsers(userId);
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
