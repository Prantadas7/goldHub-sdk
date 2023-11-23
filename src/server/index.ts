import express from "express";
import router from "./route";
import cors from 'cors'
import { config } from "../config";
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(cors({
  origin: config.origin as Array<string>,
  credentials: true
}));
app.use(router)


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.origin as Array<string>,
    credentials: true
  }
});

io.on('connection', (socket: any) => {
  console.log('=> connected', socket.id);
  socket.on('disconnect', () => {
    console.log('=> disconnected', socket.id);
  });
});

export default server;