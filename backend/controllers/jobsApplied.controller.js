import pool from "../utils/db.js"; // Ensure correct import

// ✅ Apply for a Job
export const applyForJob = async (req, res) => {
    const { applicant_id, job_id, applicant_name, applicant_field, applicant_email, applicant_phone } = req.body;

    try {
        // Fetch job details from job_postings table
        const [jobResults] = await pool.query(
            "SELECT job_title, recruiter_id FROM job_postings WHERE job_id = ?",
            [job_id]
        );

        if (jobResults.length === 0) {
            return res.status(404).json({ message: "Job not found" });
        }

        const { job_title, recruiter_id } = jobResults[0];

        // Fetch recruiter details from recruiters table
        const [recruiterResults] = await pool.query(
            "SELECT company_name, contact_name, email, phone FROM recruiters WHERE recruiter_id = ?",
            [recruiter_id]
        );

        if (recruiterResults.length === 0) {
            return res.status(404).json({ message: "Recruiter not found" });
        }

        // ✅ Extract recruiter details
        const { company_name, contact_name, email, phone } = recruiterResults[0];

        // ✅ Insert into jobs_applied table (Using correct column names)
        const insertQuery = `
            INSERT INTO jobs_applied 
            (applicant_id, job_id, applicant_name, applicant_field, applicant_email, applicant_phone, 
            application_status, job_title, company_name, contact_name, email, phone)
            VALUES (?, ?, ?, ?, ?, ?, 'applied', ?, ?, ?, ?, ?)
        `;

        await pool.query(insertQuery, [
            applicant_id, job_id, applicant_name, applicant_field, applicant_email, applicant_phone,
            job_title, company_name, contact_name, email, phone
        ]);

        return res.status(201).json({ message: "Job application submitted successfully" });

    } catch (error) {
        console.error("❌ Error applying for job:", error);
        return res.status(500).json({ message: "Failed to apply for job", error });
    }
};

// ✅ Get applications for an applicant
export const getApplicationsByApplicant = async (req, res) => {
    const { applicant_id } = req.params;

    try {
        const query = `
            SELECT ja.*, jp.job_title, r.company_name, r.contact_name, r.email, r.phone
            FROM jobs_applied ja
            JOIN job_postings jp ON ja.job_id = jp.job_id
            JOIN recruiters r ON jp.recruiter_id = r.recruiter_id
            WHERE ja.applicant_id = ?
        `;

        const [rows] = await pool.query(query, [applicant_id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No applications found for this applicant" });
        }

        return res.status(200).json({ success: true, applications: rows });
    } catch (error) {
        console.error("❌ Error fetching applications:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch applications", error });
    }
};

// ✅ Update application status (Recruiter action)
export const updateApplicationStatus = async (req, res) => {
    const { application_id } = req.params;
    const { application_status } = req.body;

    // Allowed statuses
    const validStatuses = ["applied", "under_review", "interview_scheduled", "hired", "rejected"];
    if (!validStatuses.includes(application_status)) {
        return res.status(400).json({ message: "Invalid application status" });
    }

    try {
        const query = `UPDATE jobs_applied SET application_status = ? WHERE application_id = ?`;
        const [result] = await pool.query(query, [application_status, application_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Application not found" });
        }

        return res.status(200).json({ message: "Application status updated successfully" });
    } catch (error) {
        console.error("❌ Error updating application status:", error);
        return res.status(500).json({ message: "Failed to update application status", error });
    }
};
