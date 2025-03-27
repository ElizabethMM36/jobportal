import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing! Check your .env file.");
    process.exit(1);
}

const isAuthenticated = async (req, res, next) => {
    try {
        let token = req.cookies?.token; // Check token in cookies
        console.log("Token from cookies:", token);

        if (!token && req.headers.authorization) {
            const parts = req.headers.authorization.split(" ");
            if (parts.length === 2 && parts[0] === "Bearer") {
                token = parts[1]; // Extract from 'Bearer <token>'
                console.log("Token from Authorization header:", token);
            }
        }

        if (!token) {
            console.log("❌ No token found, authentication failed");
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, JWT_SECRET);
        console.log("✅ Decoded Token Data:", decode);

        req.id = decode.user_id;
        req.role = decode.role;
        console.log("✅ User ID:", req.id, "| Role:", req.role);

        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(401).json({ message: "Authentication failed", success: false });
    }
};

export default isAuthenticated;
