import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
    insertUser,
    getUserByUsername,
    updateUserProfile,
} from "../models/user.model.js";
import {
    insertApplicant,
    getAllApplicantsFromDB,
    getApplicantByIdFromDB,
    updateApplicantProfile,
} from "../models/jobApplicants.model.js";
import { insertRecruiter } from "../models/recruiters.model.js";
import { insertEducation } from "../models/applicantEducation.model.js";

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing! Check your .env file.");
    process.exit(1); // Exit if secret key is missing
}

// **Register a New User**
export const register = async (req, res) => {
    const {
        username,
        password,
        role,
        full_name,
        birth_year,
        current_location,
        phone,
        email,
        preferred_position,
        industry_fields,
        education,
    } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user_id = await insertUser(username, passwordHash, role);

        if (role === "applicant") {
            const applicant_id = await insertApplicant(
                user_id,
                username,
                password,
                full_name,
                birth_year,
                current_location,
                phone,
                email,
                preferred_position,
                industry_fields
            );

            if (education && Array.isArray(education)) {
                for (const edu of education) {
                    const { institution, degree, start_year, end_year } = edu;
                    const certificateFiles = req.files
                        ? req.files.map((file) => file.path).join(",")
                        : "";
                    await insertEducation(
                        applicant_id,
                        institution,
                        degree,
                        start_year,
                        end_year,
                        certificateFiles
                    );
                }
            }

            return res
                .status(201)
                .json({ message: "Applicant registered successfully", applicant_id });
        } else if (role === "recruiter") {
            const {
                contact_name,
                position,
                email,
                phone,
                company_name,
                company_address,
                company_email,
                company_phone,
                locations,
                services,
                hiring_preferences,
            } = req.body;

            const recruiter_id = await insertRecruiter(
                user_id,
                username,
                password,
                contact_name,
                position,
                email,
                phone,
                company_name,
                company_address,
                company_email,
                company_phone,
                locations,
                services,
                hiring_preferences
            );

            return res
                .status(201)
                .json({ message: "Recruiter registered successfully", recruiter_id });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Registration failed", error });
    }
};

// **User Login**
export const login = async (req, res) => {
    try {
        console.log("Received login request:", req.body); // Log the request body

        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await getUserByUsername(username);
        console.log("Fetched user from DB:", user);

        if (!user || user.role !== role) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log("Generated Token:", token);

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Login failed", error });
    }
};

// **Update Profile**
export const updateProfile = async (req, res) => {
    const { user_id, newUsername, newPassword, phone, email } = req.body;
    try {
        const newPasswordHash = newPassword
            ? await bcrypt.hash(newPassword, 10)
            : null;

        await updateUserProfile(user_id, newUsername, newPasswordHash);

        if (phone || email) {
            await updateApplicantProfile(user_id, phone, email);
        }

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Profile update failed", error });
    }
};

// **Logout**
export const logout = async (req, res) => {
    try {
        res.clearCookie("token"); // ✅ Clear the authentication token
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Logout failed", error });
    }
};


// **Get All Applicants**
export const getAllApplicants = async (req, res) => {
    try {
        const applicants = await getAllApplicantsFromDB();
        return res.status(200).json({ applicants });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch applicants", error });
    }
};

// **Get Single Applicant by ID**
export const getApplicantById = async (req, res) => {
    const { id } = req.params;
    try {
        const applicant = await getApplicantByIdFromDB(id);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }
        return res.status(200).json({ applicant });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch applicant", error });
    }
};
