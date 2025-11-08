import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
//import workflowRoutes from "./routes/workflowRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());       //For interaction b/w frontend and backend on different port.
app.use(express.json());  //convert json data in req body to JS object
app.use(morgan("dev"));   // for logging purpose for easy debugging.

// Routes
app.use("/api/auth", authRoutes);
//app.use("/api/workflow", workflowRoutes);

// Default route
app.get("/", (req, res) => res.send("Workflow System API running..."));

// Health check route
app.get("/check", (req, res) => {
  res.send("✅ Auth routes are mounted correctly");
});
app.get("/routes", (req, res) => {
  res.json({
    auth: "/api/auth/signup or /api/auth/login",
    workflow: "/api/workflow"
  });
});


export default app;
