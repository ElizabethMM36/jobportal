import pool from "../utils/db.js";
import bcrypt from "bcrypt";

// ✅ Insert a new admin
export const insertAdmin = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO admins (username, password_hash) VALUES (?, ?)";
    await pool.query(query, [username, hashedPassword]);
};

// ✅ Find admin by username
export const findAdminByUsername = async (username) => {
    const query = "SELECT * FROM admins WHERE username = ?";
    const [rows] = await pool.query(query, [username]);
    return rows[0];
};
