import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import publisherRoute from "./routes/publisher/publisherRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/publisher", publisherRoute);

app.get("/", (req, res) => {
  res.json({ message: "server running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});