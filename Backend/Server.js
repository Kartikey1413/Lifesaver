import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import donorsRoutes from "./routes/donorsRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());


// Middleware for CORS parsing
const allowedOrigins = [
    "http://localhost:5173",
    "https://lifesaver-blood-donors.vercel.app",
  ];
app.use(
  cors({
    origin: function (origin, callback) {
      // console.log("Request from origin:", origin); // Log origin for debugging
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("api/user", userRoutes)
app.use("/api/donors", donorsRoutes);
app.use("/api/review", reviewRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
