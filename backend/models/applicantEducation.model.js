import pool from '../utils/db.js';

export const createApplicantEducationTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS applicant_education (
            education_id INT AUTO_INCREMENT PRIMARY KEY,
            applicant_id INT NOT NULL,
            institution VARCHAR(255) NOT NULL,
            degree VARCHAR(255) NOT NULL,
            start_year INT NOT NULL,
            end_year INT,
            certificate_files TEXT,  -- Stores uploaded file paths (comma-separated)
            FOREIGN KEY (applicant_id) REFERENCES job_applicants(applicant_id) ON DELETE CASCADE
        );
    `;
    await pool.query(query);
};

// Insert Education Record with Uploaded Certificate Files
export const insertEducation = async (applicant_id, institution, degree, startYear, endYear, certificateFiles) => {
    const query = `INSERT INTO applicant_education (applicant_id, institution, degree, start_year, end_year, certificate_files) VALUES (?, ?, ?, ?, ?, ?)`;
    await pool.query(query, [applicant_id, institution, degree, startYear, endYear, certificateFiles]);
};

// Fetch Education Details
export const getEducationByapplicant_id = async (applicant_id) => {
    const query = `SELECT * FROM applicant_education WHERE applicant_id = ?`;
    const [rows] = await pool.query(query, [applicant_id]);
    return rows;
};
