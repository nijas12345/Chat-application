class ConversationService {
  constructor(conversationRepository) {
    this.conversationRepository = conversationRepository;
  }

  findAllConversationsForUser = async (userId) => {
    try {
      return await this.conversationRepository.findAllConversationsForUser(
        userId
      );
    } catch (error) {
      throw error;
    }
  };

  selectConversationByUserId = async (userId, foriegnUserId) => {
    try {
      const existingConversation =
        await this.conversationRepository.selectConversationByUserId(
          userId,
          foriegnUserId
        );

      if (!existingConversation) {
        return await this.conversationRepository.createConversation(
          userId,
          foriegnUserId
        );
      }

      return existingConversation;
    } catch (error) {
      throw error;
    }
  };

  selectConversationByConvId = async (convId) => {
    try {
      return await this.conversationRepository.selectConversationByConvId(
        convId
      );
    } catch (error) {
      throw error;
    }
  };

  updateConversation = async (conversationId, content) => {
    try {
      return await this.conversationRepository.updateConversation(
        conversationId,
        content
      );
    } catch (error) {
      throw error;
    }
  };
}

export default ConversationService;
