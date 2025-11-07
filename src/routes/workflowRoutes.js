// src/routes/workflowRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create", protect, authorizeRoles("admin", "manager"), (req, res) => {
  res.json({ message: `Workflow created by ${req.user.role}`, user: req.user.email });
});

router.get("/view", protect, (req, res) => {
  res.json({ message: `Workflow visible to ${req.user.role}` });
});

export default router;
