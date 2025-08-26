import HTTP_STATUS from "../enums/httpStatusCode.js";

class ConversationController {
  constructor(conversationService) {
    this.conversationService = conversationService;
  }

  findAllConversationsForUser = async (req, res) => {
    try {
      const userId = req.userId;
      const conversation =
        await this.conversationService.findAllConversationsForUser(userId);

      res.status(HTTP_STATUS.OK).json(conversation);
    } catch (error) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message || "Failed to fetch conversations" });
    }
  };

  SelectConversationByUserId = async (req, res) => {
    try {
      const foriegnUserId = req.params.userId;
      const userId = req.userId;
      const conversation =
        await this.conversationService.selectConversationByUserId(
          userId,
          foriegnUserId
        );
      res.status(HTTP_STATUS.OK).json(conversation);
    } catch (error) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message || "Failed to fetch conversation" });
    }
  };

  selectConversationByConvId = async (req, res) => {
    try {
      const convId = req.params.conversationId;
      const conversation =
        await this.conversationService.selectConversationByConvId(convId);
      res.status(HTTP_STATUS.OK).json(conversation);
    } catch (error) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message || "Failed to fetch conversation" });
    }
  };
}

export default ConversationController;
