import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.json({ message: "server running" });
});


// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
