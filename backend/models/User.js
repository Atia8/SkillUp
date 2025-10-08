// Import database connection
const { pool } = require('../config/database');
const bcrypt = require('bcryptjs'); // Import bcrypt

class User {
  // Create a new user
  static async create(userData) {
    const { name, email, password, skills, bio } = userData;
    
     // 🔐 HASH THE PASSWORD before storing
    const hashedPassword = await bcrypt.hash(password, 12);
    // SQL query with placeholders (?) for security
    const query = `
      INSERT INTO users (name, email, password, skills, bio,created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?,NOW(), NOW())
    `;
    
    // Execute the query with values
    const [result] = await pool.execute(query, [name, email, hashedPassword, skills, bio]);
    return result;
  }

  // Find user by email (for login)
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    return rows[0]; // Return first user found or undefined
  }

  // Find user by ID (for profiles) - excludes password for security
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, skills, bio, created_at FROM users WHERE id = ?', 
      [id]
    );
    return rows[0];
  }
  // 🔐 NEW: Verify password for login
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

}

// Export the User class
module.exports = User;