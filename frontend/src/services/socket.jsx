// socket.js
import { io } from "socket.io-client";

const URL = "http://localhost:5000"; // your backend
export const socket = io(URL, { autoConnect: false });
