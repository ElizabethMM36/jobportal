import pool from "../utils/db.js";

// ✅ Create a new job posting
export const createJobPosting = async (req, res) => {
    const { recruiter_id, job_title, job_description, required_experience, required_skills, salary, job_location } = req.body;

    try {
        // Validate recruiter_id exists
        const [recruiter] = await pool.query(`SELECT * FROM recruiters WHERE recruiter_id = ?`, [recruiter_id]);
        if (recruiter.length === 0) {
            return res.status(400).json({ message: "Invalid recruiter_id: Recruiter does not exist" });
        }

        // ✅ Ensure required_skills is stored as JSON
        const skills = JSON.stringify(required_skills);

        const query = `
            INSERT INTO job_postings (recruiter_id, job_title, job_description, required_experience, required_skills, salary, job_location) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        await pool.query(query, [recruiter_id, job_title, job_description, required_experience, skills, salary, job_location]);

        return res.status(201).json({ message: "Job posting created successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Failed to create job posting", error });
    }
};

// ✅ Get all job postings with recruiter (company) details
export const getJobPostings = async (req, res) => {
    try {
        const query = `
            SELECT jp.*, r.company_name, r.company_email, r.company_address, r.company_phone 
            FROM job_postings jp
            JOIN recruiters r ON jp.recruiter_id = r.recruiter_id
        `;

        const [rows] = await pool.query(query);
        return res.status(200).json({ jobs: rows });

    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch job postings", error });
    }
};

export const searchJobPostings = async (req, res) => {
    try {
        let { job_title, job_location } = req.query;

        // Ensure the values are strings or set them to empty strings
        job_title = typeof job_title === "string" ? job_title.trim() : "";
        job_location = typeof job_location === "string" ? job_location.trim() : "";

        let query = `
            SELECT jp.*, r.company_name 
            FROM job_postings jp
            JOIN recruiters r ON jp.recruiter_id = r.recruiter_id
            WHERE 1=1`;
        
        const values = [];

        if (job_title) {
            query += " AND jp.job_title LIKE ?";
            values.push(`%${job_title}%`);
        }

        if (job_location) {
            query += " AND jp.job_location LIKE ?";
            values.push(`%${job_location}%`);
        }

        // If no filters are applied, return an error instead of querying everything
        if (values.length === 0) {
            return res.status(400).json({ message: "Please provide a job title or location to search." });
        }

        const [rows] = await pool.query(query, values);
        return res.status(200).json({ jobs: rows });
    } catch (error) {
        console.error("❌ Error searching job postings:", error);
        return res.status(500).json({ message: "Error searching job postings", error });
    }
};
