const mysql = require('mysql2/promise');
require('dotenv').config();
// DEBUG: Check what environment variables are available
// console.log('🔧 Checking MySQL environment variables:');
// console.log('MYSQLHOST:', process.env.MYSQLHOST);
// console.log('MYSQLUSER:', process.env.MYSQLUSER);
// console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE);
// console.log('MYSQLPORT:', process.env.MYSQLPORT);
// console.log('MYSQL_URL:', process.env.MYSQL_URL ? '***SET***' : 'NOT SET');


// const dbConfig = {
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root', 
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'skillshare',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// };

let dbConfig;

if (process.env.MYSQL_URL) {
  // Use the connection URL
  dbConfig = {
    uri: process.env.MYSQL_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
} else {
  // Use individual variables
  dbConfig = {
    host: process.env.MYSQLHOST ||process.env.DB_HOST|| 'localhost',
    user: process.env.MYSQLUSER ||process.env.DB_USER || 'root', 
    password: process.env.MYSQLPASSWORD ||process.env.DB_PASSWORD|| '',
    database: process.env.MYSQLDATABASE || process.env.DB_NAME||'skillshare',
    port: process.env.MYSQLPORT ||process.env.DB_PORT|| 3306,
     ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}




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
