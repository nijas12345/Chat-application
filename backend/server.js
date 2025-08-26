
import express from 'express'
import { createServer } from 'http';
import { database_connection } from './config/mongoDb.js';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/userRoute.js';
import configSocket from './config/configSocket.js';
dotenv.config();
const origin = process.env.ORIGIN


const app = express();
database_connection()
const server = createServer(app);
app.use(cookieParser());

configSocket(server);
app.use(cors({
    origin:origin,
    method:["GET","POST"],
    credentials:true
}))
app.use(express.json());
app.use("/",router);
server.listen(process.env.PORT,()=>{
    console.log("Server Started");
});