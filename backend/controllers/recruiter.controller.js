import {  getAllRecruitersFromDB, getRecruiterByIdFromDB } from "../models/recruiters.model.js";




// **Get All Recruiters**
export const getAllRecruiters = async (req, res) => {
    try {
        const recruiters = await getAllRecruitersFromDB();
        return res.status(200).json({ recruiters });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch recruiters", error });
    }
};

// **Get Single Recruiter by ID**
export const getRecruiterById = async (req, res) => {
    const { id } = req.params;
    try {
        const recruiter = await getRecruiterByIdFromDB(id);
        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }
        return res.status(200).json({ recruiter });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch recruiter", error });
    }
};
