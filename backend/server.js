import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend-domain.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("LinkedIn Clone Backend is Running 🚀");
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
