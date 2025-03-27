import express from "express";
import {
    login, 
    logout, 
    register, 
    updateProfile, 
    getAllApplicants, 
    getApplicantById
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js"; // ✅ Fixed typo (mutler → multer)

const router = express.Router();

// **User Registration (Includes Applicant + Education Upload)**
router.post("/register", singleUpload, register);

// **User Login**
router.post("/login", login);

// **User Logout**
router.get("/logout", logout);
router.post("/logout", logout);

// **Update Profile**
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

// **Get All Applicants**
router.get("/applicants", getAllApplicants);

// **Get Single Applicant by ID (with Education)**
router.get("/applicants/:id", getApplicantById);

export default router;
