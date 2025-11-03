CREATE TABLE user_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  skill_name VARCHAR(100),
  certificate_url VARCHAR(500),        -- PDF file path/URL
  project_github_url VARCHAR(500),     -- GitHub repository link
  project_youtube_url VARCHAR(500),    -- YouTube demo video
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_skill (user_id, skill_name)
);