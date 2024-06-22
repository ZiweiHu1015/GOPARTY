import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from './database.js';

import userRoute from "./routes/user.route.js";
import listingRoute from "./routes/listing.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cartRoute from "./routes/cart.route.js";
import favoriteRoute from "./routes/favorite.route.js";
dotenv.config();

const app = express();

// 连接5173端口
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/sellers", userRoute);
app.use("/api/listing", listingRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/cart", cartRoute);
app.use("/api/favorite", favoriteRoute);

// Middleware to attach db pool to request
// 中间件处理请求连接到数据库
app.use((req, res, next) => {
  req.db = db;
  next();
});

// 中间件处理错误
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res.status(errorStatus).send(errorMessage);
});

// 监听8800端口
app.listen(8800, () => {
  console.log("Backend server is running on port 8800!");
});
