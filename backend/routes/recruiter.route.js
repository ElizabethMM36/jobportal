import express from "express";
import {  getAllRecruiters, getRecruiterById } from "../controllers/recruiter.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();



// **Get All Recruiters**
router.get("/", getAllRecruiters);

// **Get Single Recruiter by ID**
router.get("/:id", getRecruiterById);

export default router;
