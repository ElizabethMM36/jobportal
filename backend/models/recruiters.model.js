import pool from '../utils/db.js';
import bcrypt from 'bcrypt';

export const insertRecruiter = async (
    user_id, username, password, contact_name, position, email, phone,
    company_name, company_address, company_email, company_phone, locations, services, hiring_preferences
) => {
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO recruiters (
                user_id, username, password, contact_name, position, email, phone,
                company_name, company_address, company_email, company_phone, locations, services, hiring_preferences
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.query(query, [
            user_id, username, hashedPassword, contact_name, position, email, phone,
            company_name, company_address, company_email, company_phone,
            locations ? JSON.stringify(locations) : null,
            services,
            hiring_preferences ? JSON.stringify(hiring_preferences) : null
        ]);

        return result.insertId;
    } catch (error) {
        console.error("Error inserting recruiter:", error.message);
        throw error;
    }
};




export const getAllRecruitersFromDB = async () => {
    const query = `SELECT * FROM recruiters`;
    const [rows] = await pool.query(query);
    return rows;
};

export const getRecruiterByIdFromDB = async (id) => {
    const query = `SELECT * FROM recruiters WHERE user_id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
};
