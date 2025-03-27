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
            recruiter_contact_name VARCHAR(255),
            recruiter_email VARCHAR(255),
            recruiter_phone VARCHAR(255),
            applicant_email VARCHAR(255),
            applicant_phone VARCHAR(255),
            application_status ENUM('applied', 'under_review', 'interview_scheduled', 'hired', 'rejected'),
            FOREIGN KEY (applicant_id) REFERENCES job_applicants(applicant_id) ON DELETE CASCADE,
            FOREIGN KEY (job_id) REFERENCES job_postings(job_id) ON DELETE CASCADE
        );
    `;
    await pool.query(query);
};
