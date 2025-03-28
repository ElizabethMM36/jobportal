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

SELECT * FROM  ;
SELECT * FROM job_applicants;

DESCRIBE users;


ALTER TABLE applicant_education 
ADD COLUMN certificate_files TEXT;
DESC ;
ALTER TABLE recruiters 
ALTER TABLE jobs_applied CHANGE recruiter_contact_name contact_name VARCHAR(255);
ALTER TABLE jobs_applied CHANGE recruiter_email email VARCHAR(255);
ALTER TABLE jobs_applied CHANGE recruiter_phone phone VARCHAR(20)
DESCRIBE recruiters
DESCRIBE jobs_applied;
DESCRIBE job_matches
SHOW CREATE TABLE jobs_applied;
SHOW COLUMNS FROM jobs_applied;
ALTER TABLE jobs_applied 
MODIFY COLUMN application_status ENUM(
    'pending', 'applied', 'accepted', 'under_review', 'interview_scheduled', 'hired', 'rejected'
) NOT NULL;
SELECT COLUMN_TYPE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'jobs_applied' 
AND COLUMN_NAME = 'application_status';
SHOW COLUMNS FROM job_applicants;
INSERT INTO users (user_id, username, password_hash)
VALUES (3, 'randomuser', 'hashedpassword123');


INSERT INTO job_applicants (user_id, username, password, full_name, birth_year, current_location, phone, email, preferred_position, industry_fields) INSERT INTO users (user_id, username, password_hash, role)
VALUES (
    user_id:intINSERT INTO users (user_id, username, password_hash, role)
    VALUES (
        user_id:int,
        'username:varchar',
        'password_hash:varchar',
        'role:enum'
      );,
    'username:varchar',
    'password_hash:varchar',
    'role:enum'
  );
VALUES (2, 'testuser', 'hashedpassword', 'Test Applicant', 1995, 'New York', '1234567890', 'test@applicant.com', 'Software Engineer', 'IT');


INSERT INTO job_applicants (applicant_id, user_id, username, password, full_name, birth_year, current_location, phone, email, preferred_position, industry_fields)
VALUES (2, 3, 'randomuser', 'hashedpassword123', 'Test Applicant', 1995, 'New York', '1234567890', 'test@applicant.com', 'Software Engineer', 'IT, Software Development');
SELECT * FROM job_applicants WHERE applicant_id = 2;
SELECT * FROM job_postings WHERE job_id = 1;
INSERT INTO applicant_education (
    education_id,
    applicant_id,
    institution,
    degree,
    start_year,
    end_year,
    certificate_files
  )
VALUES (
    education_id:int,
    applicant_id:int,
    'institution:varchar',
    'degree:varchar',
    start_year:int,
    end_year:int,
    'certificate_files:text'
  );
ADD COLUMN username VARCHAR(255) NOT NULL UNIQUE,
ADD COLUMN password VARCHAR(255) NOT NULL;
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE, -- Admins are also stored in `users` table
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('superadmin', 'moderator') DEFAULT 'moderator',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
SELECT * FROM admins

SHOW CREATE TABLE users;

