class ChatRepository {
  constructor(chatModel) {
    this.chatModel = chatModel;
  }

  fetchMessages = async (convId, page, limit) => {
    try {
      console.log(page, limit, limit);

      const messages = await this.chatModel
        .find({ conversationId: convId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

      console.log("message", messages.length);

      return messages.reverse();
    } catch (error) {
      throw error;
    }
  };

  addMessage = async (senderId, conversationId, content) => {
    try {
      return await this.chatModel.create({
        senderId,
        conversationId,
        content,
      });
    } catch (error) {
      throw error;
    }
  };
}

export default ChatRepository;
