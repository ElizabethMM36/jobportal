import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./utils/db.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.route.js";
import educationRoutes from "./routes/education.route.js";
import recruiterRoutes from "./routes/recruiter.route.js";
import jobPostingsRoutes from "./routes/jobPostings.routes.js";
import jobsAppliedRoutes from "./routes/jobsApplied.routes.js";
import jobMatchesRoutes from "./routes/jobMatches.routes.js";  // ✅ Import job matches routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ **Better CORS Configuration**
const corsOptions = {
    origin: ["http://localhost:5173", "http://yourfrontenddomain.com"],
    credentials: true,
};
app.use(cors(corsOptions));

// ✅ **Middleware**
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ **Static File Serving**
app.use("/api/v1/uploads", express.static("uploads")); // Ensures uploads route works correctly

// ✅ **Database Connection**
const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connected successfully!");
        connection.release();
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Stop server if DB fails
    }
};

// ✅ **API Routes**
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/education", educationRoutes);
app.use("/api/v1/recruiter", recruiterRoutes);
app.use("/api/v1/jobs-applied", jobsAppliedRoutes);
app.use("/api/v1/jobpostings", jobPostingsRoutes);
app.use("/api/v1/job-matches", jobMatchesRoutes);  // ✅ Add job matches API route
app.use("/api/v1/admin", adminRoutes);

// ❌ **Handle 404 (Unknown Routes)**
app.use((req, res) => {
    res.status(404).json({ success: false, message: "API route not found" });
});

// 🚀 **Start Server**
const startServer = async () => {
    await connectDB(); // Ensure DB is connected before starting
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
};

startServer();
