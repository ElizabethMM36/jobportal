import pool from "../utils/db.js";

// ✅ Apply for a job
export const applyForJob = async (req, res) => {
    const { applicant_id, job_id, applicant_name, applicant_field, applicant_email, applicant_phone } = req.body;

    try {
        // Fetch job details
        const [job] = await pool.query(
            `SELECT jp.job_title, r.company_name, r.recruiter_name, r.email AS recruiter_email, r.phone AS recruiter_phone
             FROM job_postings jp
             JOIN recruiters r ON jp.recruiter_id = r.recruiter_id
             WHERE jp.job_id = ?`, [job_id]);

        if (job.length === 0) {
            return res.status(404).json({ message: "Job not found" });
        }

        const { job_title, company_name, recruiter_name, recruiter_email, recruiter_phone } = job[0];

        // Insert into jobs_applied
        const query = `INSERT INTO jobs_applied (applicant_id, job_id, applicant_name, applicant_field, job_title, company_name, recruiter_contact_name, recruiter_email, recruiter_phone, applicant_email, applicant_phone, application_status)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'applied')`;
        await pool.query(query, [applicant_id, job_id, applicant_name, applicant_field, job_title, company_name, recruiter_name, recruiter_email, recruiter_phone, applicant_email, applicant_phone]);

        return res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
        console.error("❌ Error applying for job:", error);
        return res.status(500).json({ message: "Failed to apply for job", error });
    }
};

// ✅ Get all applications by applicant
export const getApplicationsByApplicant = async (req, res) => {
    const { applicant_id } = req.params;

    try {
        const query = `SELECT * FROM jobs_applied WHERE applicant_id = ?`;
        const [applications] = await pool.query(query, [applicant_id]);

        return res.status(200).json({ applications });
    } catch (error) {
        console.error("❌ Error fetching applications:", error);
        return res.status(500).json({ message: "Failed to fetch applications", error });
    }
};

// ✅ Update application status (Recruiter)
export const updateApplicationStatus = async (req, res) => {
    const { application_id } = req.params;
    const { application_status } = req.body;

    // Valid status values
    const validStatuses = ["applied", "under_review", "interview_scheduled", "hired", "rejected"];
    if (!validStatuses.includes(application_status)) {
        return res.status(400).json({ message: "Invalid application status" });
    }

    try {
        const query = `UPDATE jobs_applied SET application_status = ? WHERE application_id = ?`;
        await pool.query(query, [application_status, application_id]);

        return res.status(200).json({ message: "Application status updated successfully" });
    } catch (error) {
        console.error("❌ Error updating application status:", error);
        return res.status(500).json({ message: "Failed to update application status", error });
    }
};
