class ConversationRepository {
  constructor(conversationModel) {
    this.conversationModel = conversationModel;
  }

  selectConversationByUserId = async (userId, foriegnUserId) => {
    try {
      const conv = await this.conversationModel.findOne({
        members: { $all: [userId, foriegnUserId] },
      });
      return conv;
    } catch (error) {
      throw error;
    }
  };

  selectConversationByConvId = async (convId) => {
    try {
      const conversation = await this.conversationModel.findById(convId);
      console.log("conv", conversation);

      return conversation;
    } catch (error) {
      throw error;
    }
  };
  createConversation = async (userId, foreignUserId) => {
    try {
      const newConversation = await this.conversationModel.create({
        members: [userId, foreignUserId],
      });
      return newConversation;
    } catch (error) {
      throw error;
    }
  };

  findAllConversationsForUser = async (userId) => {
    try {
      return await this.conversationModel
        .find({
          members: userId,
        })
        .populate("members", "username")
        .sort({ updatedAt: -1 }); // most recent first
    } catch (error) {
      throw error;
    }
  };
  updateConversation = async (conversationId, content) => {
    try {
      return await this.conversationModel
        .findByIdAndUpdate(
          conversationId,
          { lastMessage: content },
          { new: true }
        )
        .populate("members", "username");
    } catch (error) {
      throw error;
    }
  };
}

export default ConversationRepository;
