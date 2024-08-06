import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();
// To parse incoming requests with JSON payloads (from req.body)
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get("/", (req, res) => {
    // root route http://localhost:5000/
//     res.send("Hello Ruby love☘️");
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`)
});

import axios from 'axios';
import cron from 'node-cron';

const url = 'https://sarim-chat-app.onrender.com/';


// Function to send a request
const sendRequest = async () => {
  try {
    const response = await axios.get(url);
    console.log(`Request sent at ${new Date().toLocaleTimeString()}:`, response.status);
  } catch (error) {
    console.error(`Error sending request at ${new Date().toLocaleTimeString()}:`, error.message);
  }
};

// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log(`Sending request to ${url}`);
  sendRequest();
});

// Start immediately
sendRequest();
