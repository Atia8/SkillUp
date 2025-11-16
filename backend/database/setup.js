// database/setup.js
const pool = require('../config/database'); // your existing pool

const initializeDatabase = async () => {
  try {
    console.log('🔄 Creating database tables...');
    
    // 1. USERS TABLE
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        skills TEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 2. USER_PROFILES TABLE
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        user_id INT PRIMARY KEY,
        title VARCHAR(100),
        bio TEXT,
        avatar_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // 3. MESSAGES TABLE
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        content TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (receiver_id) REFERENCES users(id),
        INDEX idx_sender_receiver (sender_id, receiver_id),
        INDEX idx_receiver_sender (receiver_id, sender_id),
        INDEX idx_created_at (created_at)
      )
    `);

    // 4. USER_SKILLS TABLE
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS user_skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        skill_name VARCHAR(100),
        certificate_url VARCHAR(500),
        project_github_url VARCHAR(500),
        project_youtube_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_skill (user_id, skill_name)
      )
    `);

    // 5. WISHLIST TABLE
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        wish_skill_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_wish_skill (user_id, wish_skill_name)
      )
    `);

    // 6. FOLLOWERS TABLE
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS followers (
        follower_id INT,
        following_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (follower_id, following_id),
        FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // 7. REVIEWS TABLE
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reviewer_id INT,
        reviewee_id INT, 
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (reviewee_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_review (reviewer_id, reviewee_id)
      )
    `);

    console.log('🎉 All tables created successfully!');
  } catch (error) {
    console.log('❌ Error creating tables:', error.message);
  }
};

module.exports = initializeDatabase;