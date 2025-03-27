import pool from "../utils/db.js";

// ✅ Insert a new job posting
export const insertJobPosting = async (recruiter_id, job_title, job_description, required_experience, required_skills, salary, job_location) => {
    try {
        // Ensure required_experience is a valid number
        if (!Number.isInteger(required_experience)) {
            throw new Error("Invalid required_experience. Must be an integer.");
        }

        // Validate required_skills (Ensure it's an array before storing)
        if (!Array.isArray(required_skills)) {
            throw new Error("Invalid required_skills. Must be an array.");
        }

        const query = `
            INSERT INTO job_postings 
            (recruiter_id, job_title, job_description, required_experience, required_skills, salary, job_location) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await pool.query(query, [
            recruiter_id, 
            job_title, 
            job_description, 
            required_experience, 
            JSON.stringify(required_skills), // Store as JSON string
            salary, 
            job_location
        ]);

        return { success: true, job_posting_id: result.insertId };
    } catch (error) {
        console.error("❌ Error inserting job posting:", error.message);
        return { success: false, error: error.message };
    }
};

// ✅ Get all job postings with recruiter company name
export const getJobPostings = async () => {
    try {
        const query = `
            SELECT jp.*, r.company_name 
            FROM job_postings jp
            JOIN recruiters r ON jp.recruiter_id = r.recruiter_id`;

        const [rows] = await pool.query(query);
        return { success: true, jobs: rows };
    } catch (error) {
        console.error("❌ Error fetching job postings:", error.message);
        return { success: false, error: error.message };
    }
};

// ✅ Search job postings by job title or location
export const searchJobPostings = async (job_title, job_location) => {
    try {
        let query = `
            SELECT jp.*, r.company_name 
            FROM job_postings jp
            JOIN recruiters r ON jp.recruiter_id = r.recruiter_id
            WHERE 1=1`;
        
        const values = [];

        if (job_title && typeof job_title === "string") {
            query += " AND jp.job_title LIKE ?";
            values.push(`%${job_title}%`);
        }
        if (job_location && typeof job_location === "string") {
            query += " AND jp.job_location LIKE ?";
            values.push(`%${job_location}%`);
        }

        const [rows] = await pool.query(query, values);
        return { success: true, jobs: rows };
    } catch (error) {
        console.error("❌ Error searching job postings:", error.message);
        return { success: false, error: error.message };
    }
};
