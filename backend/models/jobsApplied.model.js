import pool from '../utils/db.js';

export const createJobsAppliedTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS jobs_applied (
            application_id INT AUTO_INCREMENT PRIMARY KEY,
            applicant_id INT NOT NULL,
            job_id INT NOT NULL,
            applicant_name VARCHAR(255),
            applicant_field TEXT,
            job_title VARCHAR(255),
            company_name VARCHAR(255),
            contact_name VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(255),
            applicant_email VARCHAR(255),
            applicant_phone VARCHAR(255),
            application_status ENUM('applied', 'under_review', 'interview_scheduled', 'hired', 'rejected') DEFAULT 'applied',
            FOREIGN KEY (applicant_id) REFERENCES job_applicants(applicant_id) ON DELETE CASCADE,
            FOREIGN KEY (job_id) REFERENCES job_postings(job_id) ON DELETE CASCADE
        );
    `;

    try {
        const connection = await pool.getConnection(); // ✅ Ensure DB connection
        await connection.query(query);
        connection.release(); // ✅ Release the connection
        console.log("✅ Table `jobs_applied` created successfully (if not exists)");
    } catch (error) {
        console.error("❌ Error creating `jobs_applied` table:", error);
    }
};

// ✅ Call this function when the app starts
createJobsAppliedTable();
