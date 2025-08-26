import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import UserService from "../services/userService.js";
import UserRepository from "../respositories/userRepository.js";
import User from "../model/userModel.js";
import ChatRepository from "../respositories/chatRepository.js";
import ChatService from "../services/chatService.js";
import Message from "../model/messageModel.js";
import ConversationRepository from "../respositories/conversationRepository.js";
import Conversation from "../model/conversationModel.js";
import ConversationService from "../services/conversationService.js";

const chatRepository = new ChatRepository(Message);
const chatService = new ChatService(chatRepository);

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

const conversationRepository = new ConversationRepository(Conversation);
const conversationService = new ConversationService(conversationRepository);

const secretKey = process.env.SECRET_KEY;
const origin = process.env.ORIGIN;
const configSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: origin, // your frontend
      methods: ["GET", "POST"],
      credentials: true, // allow cookie to be sent
    },
  });

  io.use((socket, next) => {
    console.log("socket");

    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) return next(new Error("No auth cookie"));

    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) return next(new Error("No token found"));

    try {
      const decoded = jwt.verify(token, secretKey);
      socket.userId = decoded.userId;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`User connected: ${socket.userId}, socket id: ${socket.id}`);

    const updatedUser = await userService.updateUserStatus(socket.userId, true);

    io.emit("updateStatus", updatedUser);

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`${socket.userId} joined conversation ${conversationId}`);
    });

    socket.on("sendMessage", async ({ conversationId, content }) => {
      try {
        const senderId = socket.userId;
        const message = await chatService.addMessage(
          senderId,
          conversationId,
          content
        );
        const updateConversation = await conversationService.updateConversation(
          conversationId,
          content
        );

        io.to(conversationId).emit("receiveMessage", {
          message,
          updateConversation,
        });
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.userId}`);

      const offlineUser = await userService.updateUserStatus(
        socket.userId,
        false
      );
      io.emit("updateStatus", offlineUser);
    });
  });

  return io;
};

export default configSocket;
