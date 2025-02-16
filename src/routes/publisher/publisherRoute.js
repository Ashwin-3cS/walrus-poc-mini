import express from "express";
import {
  writeDataFile,
  writeDataString,
} from "../../controllers/publisher/writeData.js";

const router = express.Router();

router.put("/file", writeDataFile);
router.put("/string", writeDataString);

export default router;
