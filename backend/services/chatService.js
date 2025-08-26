class ChatService {
  constructor(chatRepository) {
    this.chatRepository = chatRepository;
  }

  fetchMessages = async (convId, page, limit) => {
    try {
      const messages = await this.chatRepository.fetchMessages(
        convId,
        page,
        limit
      );
      return messages;
    } catch (error) {
      throw error;
    }
  };

  addMessage = async (senderId, conversationId, content) => {
    try {
      return await this.chatRepository.addMessage(
        senderId,
        conversationId,
        content
      );
    } catch (error) {
      throw error;
    }
  };
}

export default ChatService;
