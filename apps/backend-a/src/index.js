import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * This is the IMPORTANT part.
 * backend-a does NOT hardcode backend-b address.
 */
const BACKEND_B_URL = process.env.BACKEND_B_URL;

if (!BACKEND_B_URL) {
  console.error("BACKEND_B_URL is not set");
  process.exit(1);
}

/**
 * Health
 */
app.get("/health", (req, res) => {
  res.json({ status: "backend-a healthy" });
});

/**
 * API that calls backend-b
 */
app.get("/aggregate", async (req, res) => {
  try {
    const response = await fetch(`${BACKEND_B_URL}/data`);
    const data = await response.json();

    res.json({
      service: "backend-a",
      receivedFrom: "backend-b",
      backendBResponse: data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to call backend-b"
    });
  }
});

app.listen(PORT, () => {
  console.log(`backend-a listening on port ${PORT}`);
  console.log(`Using BACKEND_B_URL=${BACKEND_B_URL}`);
});

