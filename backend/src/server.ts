import 'reflect-metadata';
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/db";
import authRoutes from "./routes/auth";
import commentRoutes from './routes/comments';
import likeRoutes from './routes/likes';
import favoriteRoutes from './routes/favorites';
import postRoutes from './routes/posts';
import readRoutes from './routes/userread';
import dotenv from 'dotenv'

dotenv.config()
const app = express();  

app.use(cors({ origin: "http://localhost:5173" }));  
app.use(express.json());

app.use("/auth", authRoutes);
app.use(commentRoutes);
app.use(likeRoutes);
app.use('/posts', postRoutes);
app.use('/posts', favoriteRoutes);
app.use('/posts', readRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(3000, () => console.log("Server started on port 3000"));
  })
  .catch(console.error);