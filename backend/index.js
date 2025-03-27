import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import educationRoutes from "./routes/education.route.js";
import recruiterRoutes from "./routes/recruiter.route.js";
import jobPostingsRoutes from "./routes/jobPostings.routes.js";
import jobsAppliedRoutes from "./routes/jobsApplied.routes.js";
dotenv.config();

const app = express();

// **Middleware**
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// ✅ **Connect to Database**
const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connected successfully!");
        connection.release(); // Release connection back to pool
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Stop server if DB fails
    }
};

// **API Routes**
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/education", educationRoutes);
app.use("/api/v1/uploads", express.static("uploads")); // ✅ Moved uploads inside /api/v1
app.use("/api/v1/recruiter", recruiterRoutes);

app.use("/api/v1/jobs-applied", jobsAppliedRoutes);

app.use("/api/v1/jobpostings", jobPostingsRoutes);

// 🚀 **Start Server**
app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server running at port ${PORT}`);
});

