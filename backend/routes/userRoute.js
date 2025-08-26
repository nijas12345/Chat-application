import express from "express";
import UserController from "../controllers/userController.js";
import UserService from "../services/userService.js";
import UserRepository from "../respositories/userRepository.js";
import User from "../model/userModel.js";
import { authMiddleware, getMe } from "../config/jwt.js";
import Conversation from "../model/conversationModel.js";
import ConversationRepository from "../respositories/conversationRepository.js";
import ConversationController from "../controllers/conversationController.js";
import ConversationService from "../services/conversationService.js";
import Message from "../model/messageModel.js";

import ChatRepository from "../respositories/chatRepository.js";
import ChatService from "../services/chatService.js";
import ChatController from "../controllers/chatController.js";

const router = express.Router();

const userRepository = new UserRepository(User)
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const conversationRepository = new ConversationRepository(Conversation);
const conversationService = new ConversationService(conversationRepository);
const conversationController = new ConversationController(conversationService);

const chatRepository = new ChatRepository(Message);
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

router.post("/register", userController.userRegisterPage);
router.post("/login", userController.userLoginPage);
router.get('/me',getMe);
router.get('/users',authMiddleware,userController.findAllUsers)
router.get('/conversations',authMiddleware,conversationController.findAllConversationsForUser);
router.get('/conversations/user/:userId',authMiddleware,conversationController.SelectConversationByUserId)
router.get('/conversations/conv/:conversationId',authMiddleware,conversationController.selectConversationByConvId)
router.get('/messages/:conversationId',authMiddleware,chatController.fetchMessages);
router.get('/logout',authMiddleware,userController.logout);

export default router;
