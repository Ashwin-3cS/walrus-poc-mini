import express from "express";
import { writeData } from "../../controllers/publisher/writeData.js";

const router = express.Router();

router.put("/", writeData);

export default router;