import { insertEducation, getEducationByapplicant_id } from '../models/applicantEducation.model.js';

// Upload Certificate and Save Education Record
export const uploadCertificate = async (req, res) => {
    try {
        const { applicant_id, institution, degree, startYear, endYear } = req.body;
        const certificateFiles = req.files.map(file => file.path).join(',');

        await insertEducation(applicant_id, institution, degree, startYear, endYear, certificateFiles);

        res.status(201).json({ message: 'Education record created successfully!', files: req.files });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading certificates', error });
    }
};

// Get Applicant Education
export const getEducation = async (req, res) => {
    try {
        const { applicant_id } = req.params;
        const education = await getEducationByapplicant_id(applicant_id);

        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching education details', error });
    }
};
