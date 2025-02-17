import express from "express";
import { readBlob } from "../../controllers/aggregator/readBlob.js";

const router = express.Router();

router.get("/file", readBlob);

export default router;
