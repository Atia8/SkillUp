const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user:  process.env.MYSQLUSER||process.env.DB_USER || 'root', 
  password: process.env.MYSQLPASSWORD ||process.env.DB_PASSWORD || '',
  database:  process.env.MYSQLDATABASE ||process.env.DB_NAME || 'skillshare',
    port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.log('❌ MySQL connection failed:', error.message);
    return false;
  }
};

module.exports = { pool, testConnection };