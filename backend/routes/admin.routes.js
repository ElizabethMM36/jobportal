import express from "express";
import { adminSignup, adminLogin } from "../controllers/admin.controller.js";

const router = express.Router();

// ✅ Admin Signup
router.post("/signup", adminSignup);

// ✅ Admin Login
router.post("/login", adminLogin);

export default router;
