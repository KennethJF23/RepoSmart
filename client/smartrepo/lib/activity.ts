export type ActivityCacheStatus = "HIT" | "MISS" | "N/A";

export type ActivityLogItem = {
  id: string;
  action: string;
  endpoint: string;
  repository: string;
  status: number;
  cache: ActivityCacheStatus;
  durationMs: number;
  time: string;
};

const STORAGE_KEY = "reposmart_activity_log";
const MAX_ITEMS = 120;

function isBrowser() {
  return typeof window !== "undefined";
}

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function parseRepoFromUrl(url: string): string {
  try {
    const parsed = new URL(url.trim());
    if (!/(^|\.)github\.com$/i.test(parsed.hostname)) {
      return "-";
    }

    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length < 2) {
      return "-";
    }

    return `${segments[0]}/${segments[1].replace(/\.git$/i, "")}`;
  } catch {
    return "-";
  }
}

function parseRepository(body: unknown): string {
  if (!body || typeof body !== "object") return "-";

  const withUrl = body as { url?: unknown };
  if (typeof withUrl.url === "string" && withUrl.url.trim()) {
    return parseRepoFromUrl(withUrl.url);
  }

  const withOwnerRepo = body as { owner?: unknown; repo?: unknown };
  if (
    typeof withOwnerRepo.owner === "string" &&
    withOwnerRepo.owner.trim() &&
    typeof withOwnerRepo.repo === "string" &&
    withOwnerRepo.repo.trim()
  ) {
    return `${withOwnerRepo.owner.trim()}/${withOwnerRepo.repo.trim()}`;
  }

  return "-";
}

function mapAction(endpoint: string): string {
  const normalized = endpoint.toLowerCase();

  if (normalized.endsWith("/analyze")) return "REPO ANALYZE HUMAN";
  if (normalized.endsWith("/ai-scan")) return "REPO ANALYZE AI";
  if (normalized.endsWith("/malware-pipeline-scan")) return "REPO MALWARE PIPELINE SCAN";
  if (normalized.endsWith("/malware-check")) return "REPO MALWARE CHECK";
  if (normalized.endsWith("/malware-scan")) return "REPO MALWARE COMBINED SCAN";
  if (normalized.endsWith("/malware-zip-scan")) return "REPO MALWARE ZIP SCAN";
  if (normalized.endsWith("/login") || normalized.endsWith("/github") || normalized.endsWith("/google")) {
    return "USER SIGN IN";
  }
  if (normalized.endsWith("/register")) return "USER REGISTER";

  return "API REQUEST";
}

export function pushActivityLog(params: {
  endpoint: string;
  body: unknown;
  status: number;
  cache: ActivityCacheStatus;
  durationMs: number;
}) {
  if (!isBrowser()) return;

  const existing = safeJsonParse<ActivityLogItem[]>(localStorage.getItem(STORAGE_KEY), []);
  const nextItem: ActivityLogItem = {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    action: mapAction(params.endpoint),
    endpoint: params.endpoint,
    repository: parseRepository(params.body),
    status: params.status,
    cache: params.cache,
    durationMs: Math.max(0, Math.round(params.durationMs)),
    time: new Date().toISOString(),
  };

  const trimmed = [nextItem, ...existing].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

export function getActivityLogs(): ActivityLogItem[] {
  if (!isBrowser()) return [];
  return safeJsonParse<ActivityLogItem[]>(localStorage.getItem(STORAGE_KEY), []);
}

function getRowsOldestFirst() {
  const rows = getActivityLogs();
  return [...rows].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
}

function inferCachedRows(rowsOldestFirst: ActivityLogItem[]) {
  const seenSuccessByKey = new Set<string>();
  const cachedIds = new Set<string>();

  for (const row of rowsOldestFirst) {
    if (row.repository === "-" || row.status < 200 || row.status >= 300) {
      continue;
    }

    const key = `${row.endpoint}|${row.repository}`;

    if (row.cache === "HIT") {
      cachedIds.add(row.id);
      seenSuccessByKey.add(key);
      continue;
    }

    if (row.cache === "N/A" && seenSuccessByKey.has(key)) {
      cachedIds.add(row.id);
    }

    seenSuccessByKey.add(key);
  }

  return cachedIds;
}

export function getDashboardMetrics() {
  const rows = getActivityLogs();
  const rowsOldestFirst = getRowsOldestFirst();
  const cachedIds = inferCachedRows(rowsOldestFirst);

  const trackedRepositoryCount = new Set(
    rows
      .map((item) => item.repository)
      .filter((repository) => repository !== "-")
  ).size;

  const cachedActivities = cachedIds.size;

  return {
    totalActivities: rows.length,
    trackedRepositoryCount,
    cachedActivities,
    recentRows: Math.min(rows.length, 12),
  };
}

export function getActionCounts() {
  const rows = getActivityLogs();
  const counts = new Map<string, number>();

  for (const row of rows) {
    counts.set(row.action, (counts.get(row.action) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([action, count]) => ({ action, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export function getCacheBreakdown() {
  const rowsOldestFirst = getRowsOldestFirst();
  const cachedIds = inferCachedRows(rowsOldestFirst);
  const rows = getActivityLogs();

  let hit = 0;
  let miss = 0;

  for (const row of rows) {
    if (cachedIds.has(row.id)) {
      hit += 1;
      continue;
    }

    if (row.cache === "MISS") {
      miss += 1;
    }
  }

  return [
    { name: "HIT", value: hit },
    { name: "MISS", value: miss },
  ];
}

export function getActivityDurationTrend(limit = 10) {
  const rows = getRowsOldestFirst().slice(-Math.max(3, limit));
  return rows.map((row) => ({
    label: new Date(row.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    durationMs: row.durationMs,
  }));
}

export function getCachedRepositoryStats(limit = 6) {
  const rowsOldestFirst = getRowsOldestFirst();
  const cachedIds = inferCachedRows(rowsOldestFirst);
  const byRepo = new Map<
    string,
    { repository: string; hits: number; lastHitTime: string; totalDurationMs: number }
  >();

  for (const row of rowsOldestFirst) {
    if (!cachedIds.has(row.id) || row.repository === "-") continue;

    const current = byRepo.get(row.repository) ?? {
      repository: row.repository,
      hits: 0,
      lastHitTime: row.time,
      totalDurationMs: 0,
    };

    current.hits += 1;
    current.totalDurationMs += row.durationMs;
    if (new Date(row.time).getTime() > new Date(current.lastHitTime).getTime()) {
      current.lastHitTime = row.time;
    }

    byRepo.set(row.repository, current);
  }

  return Array.from(byRepo.values())
    .map((item) => ({
      repository: item.repository,
      hits: item.hits,
      avgDurationMs: Math.round(item.totalDurationMs / Math.max(1, item.hits)),
      lastHitTime: item.lastHitTime,
    }))
    .sort((a, b) => b.hits - a.hits)
    .slice(0, limit);
}
