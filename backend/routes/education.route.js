import express from "express";
import { upload } from "../middlewares/upload.js";
import { uploadCertificate, getEducation } from "../controllers/education.controller.js";

const router = express.Router();

// **Upload Education Certificates**
router.post("/upload", upload.array("certificates", 5), uploadCertificate);

// **Get Applicant's Education Details**
router.get("/:applicant_id", getEducation);

export default router;
