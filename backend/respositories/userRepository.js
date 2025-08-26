class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }
  findOneByEmail = async (email) => {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  };
  userRegisterPage = async (userData) => {
    try {
      await this.userModel.create(userData);
    } catch (error) {
      throw error;
    }
  };
  updateUserStatus = async (userId, status) => {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId, // user ID
        { isOnline: status }, // fields to update
        { new: true } // return updated document
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };
  findAllUsers = async (userId) => {
    try {
      return await this.userModel.find(
        { _id: { $ne: userId } },
        { password: 0 }
      );
    } catch (error) {
      throw error;
    }
  };
}

export default UserRepository;
