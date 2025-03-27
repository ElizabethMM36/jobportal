import pool from "../utils/db.js";

export const insertApplicant = async (user_id, username, password, full_name, birth_year, current_location, phone, email, preferred_position, industry_fields) => {
    const query = `
        INSERT INTO job_applicants (user_id, username, password, full_name, birth_year, current_location, phone, email, preferred_position, industry_fields) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [user_id, username, password, full_name, birth_year, current_location, phone, email, preferred_position, industry_fields]);
    return result.insertId;
};
export const updateApplicantProfile = async (user_id, phone, email) => {
    const query = `UPDATE job_applicants SET phone = ?, email = ? WHERE user_id = ?`;
    await pool.query(query, [phone, email, user_id]);
};
export const getAllApplicantsFromDB = async () => {
    const query = `SELECT * FROM job_applicants`;
    const [rows] = await pool.query(query);
    return rows;
};
export const getApplicantByIdFromDB = async (id) => {
    const query = `SELECT * FROM job_applicants WHERE user_id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
};
