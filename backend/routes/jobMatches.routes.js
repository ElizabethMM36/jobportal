import express from 'express';
import { insertJobMatch, getMatchesForJob, updateMatchStatus, deleteJobMatch } from '../models/jobMatches.model.js';

const router = express.Router();

// ✅ Route: Add a job match
router.post('/match', async (req, res) => {
    const { job_id, applicant_id, match_score } = req.body;
    try {
        await insertJobMatch(job_id, applicant_id, match_score);
        res.status(201).json({ message: 'Job match added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add job match', details: error.message });
    }
});

// ✅ Route: Get matches for a job
router.get('/matches/:job_id', async (req, res) => {
    const { job_id } = req.params;
    try {
        const matches = await getMatchesForJob(job_id);
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get job matches', details: error.message });
    }
});

// ✅ Route: Update job match status
router.put('/match/:match_id', async (req, res) => {
    const { match_id } = req.params;
    const { status } = req.body;
    try {
        await updateMatchStatus(match_id, status);
        res.status(200).json({ message: 'Match status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update match status', details: error.message });
    }
});

// ✅ Route: Delete a job match
router.delete('/match/:match_id', async (req, res) => {
    const { match_id } = req.params;
    try {
        await deleteJobMatch(match_id);
        res.status(200).json({ message: 'Job match deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job match', details: error.message });
    }
});

export default router;
