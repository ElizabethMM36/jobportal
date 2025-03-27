import express from "express";
import { createJobPosting, getJobPostings, searchJobPostings } from "../controllers/jobPostings.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// **Recruiter Posts a Job**
router.post("/", isAuthenticated, createJobPosting);

// **Applicant Gets All Job Listings**
router.get("/", getJobPostings);

// **Search Jobs by Title or Location**
router.get("/search", searchJobPostings);

export default router;

