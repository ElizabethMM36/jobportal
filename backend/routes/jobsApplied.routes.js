import express from "express";
import { applyForJob, getApplicationsByApplicant, updateApplicationStatus } from "../controllers/jobsApplied.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ Apply for a job
router.post("/apply", isAuthenticated, applyForJob);

// ✅ Get all job applications for an applicant
router.get("/:applicant_id", isAuthenticated, getApplicationsByApplicant);

// ✅ Recruiter updates application status
router.put("/:application_id", isAuthenticated, updateApplicationStatus);

export default router;
