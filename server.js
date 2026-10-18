const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./routes/users/userRoutes");
const postsRouter = require("./routes/posts/postsRoutes");
const commentsRoutes = require("./routes/comments/commentsRoutes");
const categoriesRoutes = require("./routes/categories/categoriesRoutes");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const Post = require("./modal/Post/Post");
const corsOptions = require("./utils/corsOptions");
const rateLimit = require("express-rate-limit");

require("dotenv").config();
require("./config/dbConnect");

const app = express();

// Security headers
app.use(helmet());

// added CORS
app.use(cors(corsOptions));

// rate-limit
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Too many request",
});

app.use(rateLimiter);

// ues json middleware for take json data in payload
app.use(express.json());

// middlewares

app.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    res.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    res.json(error.message);
  }
});

// routes
// // ----- users route
app.use("/api/v1/users", userRouter);
// // ----- posts route
app.use("/api/v1/posts", postsRouter);
// // ----- comments route
app.use("/api/v1/comments", commentsRoutes);
// // ----- categories route
app.use("/api/v1/categories", categoriesRoutes);

// Error handlers middleware
app.use(globalErrorHandler);

// 404 error

app.all("{*splat}", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

// Listen to server

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log("Server connected"));
