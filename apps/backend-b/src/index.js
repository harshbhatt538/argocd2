import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// DB config from env (injected by Kubernetes)
const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "backend-b healthy", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "db error" });
  }
});

app.get("/data", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() as timestamp"
    );

    res.json({
      service: "backend-b",
      source: "postgres",
      timestamp: result.rows[0].timestamp
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB query failed" });
  }
});

app.listen(PORT, () => {
  console.log(`backend-b listening on ${PORT}`);
});

