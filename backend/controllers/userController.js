import HTTP_STATUS from "../enums/httpStatusCode.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  userRegisterPage = async (req, res) => {
    try {
      const userData = req.body;
      await this.userService.userRegisterPage(userData);
      res
        .status(HTTP_STATUS.OK)
        .json({ message: "User Registered Successfully" });
    } catch (error) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message || "Failed to register user" });
    }
  };

  userLoginPage = async (req, res) => {
    try {
      const { token, user } = await this.userService.userLogin(req.body);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set true if using HTTPS
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: "lax",
      });

      res.status(HTTP_STATUS.OK).json({ user });
    } catch (error) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message || "Login failed" });
    }
  };

  findAllUsers = async (req, res) => {
    try {
      const userId = req.userId;
      const users = await this.userService.findAllUsers(userId);

      res.status(HTTP_STATUS.OK).json(users);
    } catch (error) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message || "Failed to fetch users" });
    }
  };

  logout = async (req, res) => {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: false, // set true if using HTTPS
        sameSite: "lax",
        expires: new Date(0), // expire immediately
      });

      res.status(HTTP_STATUS.OK).json({ message: "Logged out successfully" });
    } catch (error) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message || "Logout failed" });
    }
  };
}

export default UserController;
