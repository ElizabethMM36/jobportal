import express from "express";
import { 
    applyForJob, 
    getApplicationsByApplicant, 
    updateApplicationStatus 
} from "../controllers/jobsApplied.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Ensure authentication if needed

const router = express.Router();

// ✅ Apply for a job (Only applicants)
router.post("/apply", isAuthenticated, applyForJob);

// ✅ Get all applications for a specific applicant
router.get("/applicant/:applicant_id", isAuthenticated, getApplicationsByApplicant);

// ✅ Update application status (Only recruiters)
router.put("/update-status/:application_id", isAuthenticated, updateApplicationStatus);

export default router;
