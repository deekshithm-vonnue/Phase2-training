import { Pool } from "pg";
import dotenv from "dotenv";

//Load enviroment variables

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool
  .query("SELECT 1")
  .then(() => console.log(`Database connected`))
  .catch((err) => {
    console.log(`Failed to connect database`);
    console.error("Exact Error Details:", err.message);
  });

export default pool;
