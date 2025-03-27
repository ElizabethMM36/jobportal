import { createUserTable } from './users.model.js';
import { createJobApplicantsTable } from './jobApplicants.model.js';
import { createRecruitersTable } from './recruiters.model.js';
import { createJobPostingsTable } from './jobPostings.model.js';
import { createJobMatchesTable } from './jobMatches.model.js';
import { createJobsAppliedTable } from './jobsApplied.model.js';

const initializeDatabase = async () => {
    try {
        console.log("Initializing Database...");
        await createUserTable();
        await createJobApplicantsTable();
        await createRecruitersTable();
        await createJobPostingsTable();
        await createJobMatchesTable();
        await createJobsAppliedTable();
        console.log("✅ Database Initialized Successfully!");
    } catch (error) {
        console.error("❌ Error initializing database:", error);
    }
};

initializeDatabase();
