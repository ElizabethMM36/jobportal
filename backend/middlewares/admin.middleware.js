import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "superadmin" && decoded.role !== "moderator") {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }
        req.admin = decoded; // Store admin info in request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};
