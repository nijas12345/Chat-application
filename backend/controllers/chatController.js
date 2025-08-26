import HTTP_STATUS from "../enums/httpStatusCode.js";

class ChatController {
  constructor(chatService) {
    this.chatService = chatService;
  }
  fetchMessages = async (req, res) => {
    try {
      const convId = req.params.conversationId;
      const { page = 1, limit = 10 } = req.query;
      const messages = await this.chatService.fetchMessages(
        convId,
        page,
        limit
      );
      res.status(HTTP_STATUS.OK).json(messages);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  };
}

export default ChatController;
