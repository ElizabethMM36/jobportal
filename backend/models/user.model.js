import pool from '../utils/db.js';

export const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            role ENUM('applicant', 'recruiter', 'admin') NOT NULL
        );
    `;
    await pool.query(query);
};

export const insertUser = async (username, passwordHash, role) => {
    const query = `INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)`;
    const [result] = await pool.query(query, [username, passwordHash, role]);
    return result.insertId; // Return the newly created user_id
};

export const getUserByUsername = async (username) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        console.log("Database result for user:", rows);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    }
};


export const updateUserProfile = async (user_id, newUsername, newPasswordHash) => {
    const query = `UPDATE users SET username = ?, password_hash = ? WHERE user_id = ?`;
    await pool.query(query, [newUsername, newPasswordHash, user_id]);
};

// ✅ **NEW FUNCTION:** Update phone & email for applicants
export const updateApplicantProfile = async (user_id, phone, email) => {
    const query = `UPDATE job_applicants SET phone = ?, email = ? WHERE user_id = ?`;
    await pool.query(query, [phone, email, user_id]);
};

export const deleteUser = async (user_id) => {
    const query = `DELETE FROM users WHERE user_id = ?`;
    await pool.query(query, [user_id]);
};

