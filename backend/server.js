import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "./db/connect.to.db.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// constants
const PORT = process.env.PORT || 5000;
await connectDB();

app.use(express.json());
app.use(cookieParser());

// ? api
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`App running at port ${PORT} ...`);
});
