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
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        password TEXT NOT NULL CHECK (length(password) >= 6),
        role VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Users table created successfully.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(150) NOT NULL,

        type VARCHAR(20) NOT NULL
          CHECK (type IN ('car', 'bike', 'van', 'SUV')),

        registration_number VARCHAR(150) NOT NULL UNIQUE,

        daily_rent_price NUMERIC NOT NULL
          CHECK (daily_rent_price > 0),

        availability_status VARCHAR(20) NOT NULL
          CHECK (availability_status IN ('available', 'booked')),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Vehicles table created successfully.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,

        customer_id INTEGER NOT NULL
          REFERENCES users(id) ON DELETE CASCADE,

        vehicle_id INTEGER NOT NULL
          REFERENCES vehicles(id) ON DELETE CASCADE,

        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL
          CHECK (rent_end_date > rent_start_date),

        total_price NUMERIC NOT NULL
          CHECK (total_price > 0),

        status VARCHAR(20) NOT NULL
          CHECK (status IN ('active', 'cancelled', 'returned')),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Bookings table created successfully.");

  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

export default initDB;