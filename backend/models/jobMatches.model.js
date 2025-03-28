import pool from '../utils/db.js';

// ✅ Create job_matches table (if not exists)
export const createJobMatchesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS job_matches (
            match_id INT AUTO_INCREMENT PRIMARY KEY,
            job_id INT NOT NULL,
            applicant_id INT NOT NULL,
            match_score DECIMAL(5,2),
            status ENUM('pending', 'interview', 'hired', 'rejected') DEFAULT 'pending',
            FOREIGN KEY (job_id) REFERENCES job_postings(job_id) ON DELETE CASCADE,
            FOREIGN KEY (applicant_id) REFERENCES job_applicants(applicant_id) ON DELETE CASCADE
        );
    `;
    await pool.query(query);
};

// ✅ Insert a new job match
export const insertJobMatch = async (job_id, applicant_id, match_score, status = 'pending') => {
    const query = `
        INSERT INTO job_matches (job_id, applicant_id, match_score, status)
        VALUES (?, ?, ?, ?)
    `;
    await pool.query(query, [job_id, applicant_id, match_score, status]);
};

// ✅ Get matches for a specific job
export const getMatchesForJob = async (job_id) => {
    const query = `
        SELECT jm.*, ja.applicant_name, ja.applicant_email
        FROM job_matches jm
        JOIN job_applicants ja ON jm.applicant_id = ja.applicant_id
        WHERE jm.job_id = ?
    `;
    const [rows] = await pool.query(query, [job_id]);
    return rows;
};

// ✅ Update match status (e.g., 'interview', 'hired', 'rejected')
export const updateMatchStatus = async (match_id, status) => {
    const query = `
        UPDATE job_matches SET status = ? WHERE match_id = ?
    `;
    await pool.query(query, [status, match_id]);
};

// ✅ Delete a match if needed
export const deleteJobMatch = async (match_id) => {
    const query = `
        DELETE FROM job_matches WHERE match_id = ?
    `;
    await pool.query(query, [match_id]);
};
