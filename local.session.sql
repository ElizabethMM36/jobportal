CREATE TABLE applicant_education (
            education_id INT AUTO_INCREMENT PRIMARY KEY,
            applicant_id INT NOT NULL,
            institution VARCHAR(255) NOT NULL,
            degree VARCHAR(255) NOT NULL,
            start_year INT NOT NULL,
            end_year INT,
            certificate_files TEXT,  -- Stores uploaded file paths (comma-separated)
            FOREIGN KEY (applicant_id) REFERENCES job_applicants(applicant_id) ON DELETE CASCADE
        );
DESC applicant_education;

SELECT * FROM recruiters;

ALTER TABLE applicant_education 
ADD COLUMN certificate_files TEXT;
DESC job_applicants;
ALTER TABLE recruiters 
ADD COLUMN username VARCHAR(255) NOT NULL UNIQUE,
ADD COLUMN password VARCHAR(255) NOT NULL;
