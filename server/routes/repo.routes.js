const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const {
	analyzeRepository,
	aiScanRepository,
	malwareCheckRepository,
	malwareZipScanRepository,
	malwareCombinedScanRepository,
	malwarePipelineScanRepository,
} = require("../controllers/repo.controller");

const router = express.Router();

router.post("/analyze", authMiddleware, analyzeRepository);
router.post("/ai-scan", authMiddleware, aiScanRepository);
router.post("/malware-check", authMiddleware, malwareCheckRepository);
router.post("/malware-zip-scan", authMiddleware, malwareZipScanRepository);
router.post("/malware-scan", authMiddleware, malwareCombinedScanRepository);
router.post("/malware-pipeline-scan", authMiddleware, malwarePipelineScanRepository);

module.exports = router;
