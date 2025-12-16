import { Pool } from "pg";
import config from ".";

// pool create
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

// DB
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(200) NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NUL,
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("Users table created successfully.");

    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS todos(
    //     id SERIAL PRIMARY KEY,
    //     user_id INT REFERENCES users(id) ON DELETE CASCADE,
    //     title VARCHAR(250) NOT NULL,
    //     description TEXT, 
    //     completed BOOLEAN DEFAULT false,
    //     due_date DATE,
    //     created_at TIMESTAMP DEFAULT NOW(),
    //     updated_at TIMESTAMP DEFAULT NOW()
    //   )
    // `);


    console.log("Todos table created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

export default initDB;