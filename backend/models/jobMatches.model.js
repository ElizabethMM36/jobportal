import pool from '../utils/db.js';

export const createJobMatchesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS job_matches (
            match_id INT AUTO_INCREMENT PRIMARY KEY,
            job_id INT NOT NULL,
            applicant_id INT NOT NULL,
            match_score DECIMAL(5,2),
            status ENUM('pending', 'interview', 'hired', 'rejected'),
            FOREIGN KEY (job_id) REFERENCES job_postings(job_id) ON DELETE CASCADE,
            FOREIGN KEY (applicant_id) REFERENCES job_applicants(applicant_id) ON DELETE CASCADE
        );
    `;
    await pool.query(query);
};
