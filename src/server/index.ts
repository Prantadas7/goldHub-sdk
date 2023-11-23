import express from "express";
import router from "./route";
import cors from 'cors'
import { config } from "../config";

const app = express();
app.use(express.json());
app.use(cors({
  origin: config.origin as Array<string>,
  credentials: true
}));

app.use(router)

export default app;