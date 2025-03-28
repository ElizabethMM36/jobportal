import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { insertAdmin, findAdminByUsername } from "../models/admin.model.js";

// ✅ Admin Signup
export const adminSignup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingAdmin = await findAdminByUsername(username);
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin already exists" });
        }

        await insertAdmin(username, password);
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to register admin", details: error.message });
    }
};

// ✅ Admin Login
export const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await findAdminByUsername(username);
        if (!admin) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ admin_id: admin.admin_id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Failed to login admin", details: error.message });
    }
};
