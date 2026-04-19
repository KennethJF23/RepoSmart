function extractRepoFeatures({ files, astFindings, matches }) {
    const totalFiles = files.length;

    let jsFiles = 0;
    let envFiles = 0;
    let totalSize = 0;

    for (const f of files) {
        const lowerPath = typeof f.filePath === "string" ? f.filePath.toLowerCase() : "";
        if (lowerPath.endsWith(".js")) jsFiles++;
        if (lowerPath.endsWith(".env")) envFiles++;
        totalSize += f.content.length;
    }

    const avgFileSize = totalFiles > 0 ? totalSize / totalFiles : 0;

    return {
        totalFiles,
        jsRatio: jsFiles / (totalFiles || 1),
        envCount: envFiles,
        avgFileSize,
        suspiciousFunctions: astFindings.suspiciousFunctions.length,
        suspiciousVariables: astFindings.suspiciousVariables.length,
        suspiciousCalls: astFindings.suspiciousCalls.length,
        matchCount: matches.length,
    };
}

const ANOMALY_BASELINE = {
    totalFiles: 50,
    jsRatio: 0.6,
    envCount: 1,
    avgFileSize: 500,
    suspiciousCalls: 2,
};

function safeNumber(value, fallback = 0) {
    return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function deviation(val, base) {
    return Math.abs(safeNumber(val, 0) - safeNumber(base, 0)) / (safeNumber(base, 0) + 1);
}

function getAnomalyBreakdown(features) {
    const rows = [
        { key: "totalFiles", label: "Total files" },
        { key: "jsRatio", label: "JS ratio" },
        { key: "envCount", label: "ENV files" },
        { key: "avgFileSize", label: "Avg file size" },
        { key: "suspiciousCalls", label: "Suspicious calls" },
    ];

    const breakdown = rows.map((row) => {
        const actual = safeNumber(features && features[row.key], 0);
        const baseline = safeNumber(ANOMALY_BASELINE[row.key], 0);
        const impact = Math.round(deviation(actual, baseline) * 1000) / 1000;

        return {
            key: row.key,
            label: row.label,
            actual,
            baseline,
            impact,
        };
    });

    breakdown.sort((a, b) => b.impact - a.impact);
    return breakdown;
}

function computeAnomalyScore(features) {
    const breakdown = getAnomalyBreakdown(features);
    const score = breakdown.reduce((sum, row) => sum + safeNumber(row.impact, 0), 0);
    return Math.round(score * 10) / 10;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function normalizeAnomalyScore(rawScore) {
    const safeRaw = Number.isFinite(rawScore) ? rawScore : 0;
    // Scale raw anomaly distance into a UI-friendly 0..100 score.
    return clamp(Math.round(safeRaw * 12), 0, 100);
}

function deriveAnomalyRisk(score) {
    if (score >= 75) return "HIGH";
    if (score >= 40) return "MEDIUM";
    return "LOW";
}

function summarizeAnomalies(features) {
    const anomalies = [];
    if (!features || typeof features !== "object") return anomalies;

    if ((features.suspiciousCalls || 0) >= 8) {
        anomalies.push("High volume of suspicious runtime/API calls");
    }
    if ((features.suspiciousFunctions || 0) >= 6) {
        anomalies.push("Many suspicious function identifiers detected");
    }
    if ((features.suspiciousVariables || 0) >= 10) {
        anomalies.push("Large number of sensitive variable identifiers");
    }
    if ((features.matchCount || 0) >= 35) {
        anomalies.push("Unusually high malicious keyword match density");
    }
    if ((features.envCount || 0) >= 3) {
        anomalies.push("Multiple environment credential files detected");
    }

    if ((features.jsRatio || 0) <= 0.05 && (features.totalFiles || 0) >= 30) {
        anomalies.push("Repository structure is atypical for scanned language mix");
    }

    return anomalies;
}

function computeFinalVerdict({ baseScore, anomalyScore }) {
    // If strong anomaly but low malware score, return a dedicated anomaly verdict.
    if (anomalyScore >= 4.5 && baseScore < 15) {
        return "ANOMALOUS";
    }
    return null; // fallback to existing verdict
}

module.exports = {
    extractRepoFeatures,
    computeAnomalyScore,
    getAnomalyBreakdown,
    normalizeAnomalyScore,
    deriveAnomalyRisk,
    summarizeAnomalies,
    computeFinalVerdict,
};