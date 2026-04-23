"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Activity,
  Shield,
  BarChart3,
  Database,
  Clock3,
  UserCircle2,
  ChartNoAxesCombined,
  Server,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  AreaChart,
  Area,
  Cell,
} from "recharts";

import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import {
  getAuthToken,
  getAuthUser,
  getAuthMeta,
  subscribeAuth,
} from "@/lib/auth";
import {
  getActivityLogs,
  getActionCounts,
  getActivityDurationTrend,
  getCachedRepositoryStats,
  getDashboardMetrics,
} from "@/lib/activity";

function formatDateTime(value: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getStatusTone(status: number) {
  if (status >= 200 && status < 300) return "text-emerald-300";
  if (status >= 400) return "text-amber-300";
  return "text-slate-300";
}

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "8px 10px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
  },
  labelStyle: {
    color: "#8b949e",
    fontSize: "11px",
    marginBottom: "2px",
  },
  itemStyle: {
    color: "#e6edf3",
    fontSize: "12px",
    fontWeight: 500,
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const token = useSyncExternalStore(subscribeAuth, getAuthToken, () => null);

  const [refreshTick, setRefreshTick] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(() => new Date());

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        setRefreshTick((v) => v + 1);
      }
    };

    window.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onVisibility);

    return () => {
      window.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
    };
  }, []);

  const user = token ? getAuthUser() : null;
  const meta = token ? getAuthMeta() : null;

  const metrics = useMemo(() => getDashboardMetrics(), [refreshTick]);
  const actions = useMemo(() => getActionCounts(), [refreshTick]);
  const topAction = actions[0];
  const statusBreakdown = useMemo(() => {
    const rows = getActivityLogs();
    const buckets = {
      "2xx": 0,
      "4xx": 0,
      "5xx": 0,
      Other: 0,
    } as Record<string, number>;

    for (const row of rows) {
      if (row.status >= 200 && row.status < 300) buckets["2xx"] += 1;
      else if (row.status >= 400 && row.status < 500) buckets["4xx"] += 1;
      else if (row.status >= 500) buckets["5xx"] += 1;
      else buckets.Other += 1;
    }

    return [
      { label: "2xx", count: buckets["2xx"], color: "#3fb950" },
      { label: "4xx", count: buckets["4xx"], color: "#f2cc60" },
      { label: "5xx", count: buckets["5xx"], color: "#ff7b72" },
      { label: "Other", count: buckets.Other, color: "#58a6ff" },
    ];
  }, [refreshTick]);
  const durationTrend = useMemo(() => getActivityDurationTrend(12), [refreshTick]);
  const cachedRepos = useMemo(() => getCachedRepositoryStats(7), [refreshTick]);
  const activityRows = useMemo(() => getActivityLogs().slice(0, 12), [refreshTick]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setRefreshTick((v) => v + 1);
    setLastRefreshedAt(new Date());
    router.refresh();

    requestAnimationFrame(() => {
      setIsRefreshing(false);
    });
  };

  if (!token) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Header onLogin={() => router.push("/")} onRegister={() => router.push("/")} />

      <main className="relative overflow-hidden pb-20 pt-16">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="h-full w-full opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #58a6ff 1px, transparent 1px), linear-gradient(to bottom, #58a6ff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute -left-10 top-14 h-72 w-72 rounded-full bg-[#1f6feb]/20 blur-3xl" />
          <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-[#3fb950]/15 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-10">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-[#2f3a4d] bg-linear-to-br from-[#0f1d43] via-[#0d1a3a] to-[#09122a] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:p-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#8ab4ff]">User Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              Welcome, {user?.username ?? "Developer"}
            </h1>
            <p className="mt-2 text-[#9fb1cf]">
              Cumulative profile insights, recent activities, and cached repositories.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-[#2b3a52] bg-[#0b1733]/80 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[#9cb3d9]">
                  <UserCircle2 className="h-4 w-4" />
                  Email
                </div>
                <div className="mt-1 text-sm text-[#d7e4ff]">{user?.email ?? "-"}</div>
              </div>

              <div className="rounded-xl border border-[#2b3a52] bg-[#0b1733]/80 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[#9cb3d9]">
                  <Clock3 className="h-4 w-4" />
                  Joined
                </div>
                <div className="mt-1 text-sm text-[#d7e4ff]">{formatDateTime(meta?.firstAuthenticatedAt ?? null)}</div>
              </div>

              <div className="rounded-xl border border-[#2b3a52] bg-[#0b1733]/80 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[#9cb3d9]">
                  <BarChart3 className="h-4 w-4" />
                  Most Used Action
                </div>
                <div className="mt-1 text-sm text-[#d7e4ff]">
                  {topAction ? `${topAction.action} (${topAction.count})` : "No activity yet"}
                </div>
              </div>
            </div>
          </motion.section>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Activities",
                value: metrics.totalActivities,
                icon: BarChart3,
              },
              {
                label: "Repositories Tracked",
                value: metrics.trackedRepositoryCount,
                icon: Database,
              },
              {
                label: "Cached Activities",
                value: metrics.cachedActivities,
                icon: Shield,
              },
              {
                label: "Recent Activity Rows",
                value: metrics.recentRows,
                icon: Activity,
              },
            ].map((card) => (
              <motion.article
                key={card.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="rounded-2xl border border-[#24314a] bg-[#0b1326]/85 p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-wide text-[#90a8d1]">{card.label}</p>
                  <card.icon className="h-4 w-4 text-[#7aa5ff]" />
                </div>
                <p className="mt-3 text-4xl font-semibold text-[#65e6ff]">{card.value}</p>
              </motion.article>
            ))}
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#24314a] bg-[#0b1326]/85 p-5">
              <h2 className="text-2xl font-semibold">Action Frequency</h2>
              <p className="mt-1 text-sm text-[#9cb0d5]">Which tools are used most across recent activity.</p>

              <div className="mt-4 h-64 w-full">
                {actions.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={actions} margin={{ top: 8, right: 8, left: -10, bottom: 44 }}>
                      <CartesianGrid stroke="#1f2a3d" strokeDasharray="3 3" />
                      <XAxis
                        dataKey="action"
                        stroke="#8b949e"
                        fontSize={11}
                        angle={-20}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis stroke="#8b949e" allowDecimals={false} fontSize={11} />
                      <Tooltip {...tooltipStyle} />
                      <Bar dataKey="count" fill="#58a6ff" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg border border-[#1d2840] bg-[#0a1228] text-sm text-[#9cb0d5]">
                    No activities yet. Run an analysis to populate this chart.
                  </div>
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-[#24314a] bg-[#0b1326]/85 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold">HTTP Status Overview</h2>
                <ChartNoAxesCombined className="h-4 w-4 text-[#8fb2ff]" />
              </div>
              <p className="mt-1 text-sm text-[#9cb0d5]">Response quality split by status-code range.</p>

              <div className="mt-4 h-64 w-full">
                {statusBreakdown.some((item) => item.count > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusBreakdown} margin={{ top: 8, right: 8, left: -10, bottom: 10 }}>
                      <CartesianGrid stroke="#1f2a3d" strokeDasharray="3 3" />
                      <XAxis dataKey="label" stroke="#8b949e" fontSize={11} />
                      <YAxis stroke="#8b949e" allowDecimals={false} fontSize={11} />
                      <Tooltip {...tooltipStyle} />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {statusBreakdown.map((entry) => (
                          <Cell key={entry.label} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg border border-[#1d2840] bg-[#0a1228] text-sm text-[#9cb0d5]">
                    No response stats yet. Run an analyzer to populate this chart.
                  </div>
                )}
              </div>
            </article>
          </section>

          <section className="mt-8 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
            <article className="rounded-2xl border border-[#24314a] bg-[#0b1326]/85 p-5">
              <h2 className="text-2xl font-semibold">Request Duration Trend</h2>
              <p className="mt-1 text-sm text-[#9cb0d5]">Recent API runtime pattern in milliseconds.</p>
              <div className="mt-4 h-64 w-full">
                {durationTrend.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={durationTrend} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                      <defs>
                        <linearGradient id="durationFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#58a6ff" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#1f2a3d" strokeDasharray="3 3" />
                      <XAxis dataKey="label" stroke="#8b949e" fontSize={11} />
                      <YAxis stroke="#8b949e" fontSize={11} />
                      <Tooltip {...tooltipStyle} />
                      <Area type="monotone" dataKey="durationMs" stroke="#58a6ff" fill="url(#durationFill)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg border border-[#1d2840] bg-[#0a1228] text-sm text-[#9cb0d5]">
                    Run an analyzer to generate trend data.
                  </div>
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-[#24314a] bg-[#0b1326]/85 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold">Cached Repositories</h2>
                <Server className="h-4 w-4 text-[#8fb2ff]" />
              </div>

              <div className="mt-4 space-y-2">
                {cachedRepos.length > 0 ? (
                  cachedRepos.map((repo) => (
                    <div key={repo.repository} className="rounded-lg border border-[#1d2840] bg-[#0a1228] px-3 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm text-[#d7e4ff]">{repo.repository}</p>
                        <span className="text-xs font-semibold text-emerald-300">{repo.hits} hit{repo.hits > 1 ? "s" : ""}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#8ea5cc]">avg {repo.avgDurationMs} ms • last {formatDateTime(repo.lastHitTime)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#9cb0d5]">No cached repository activity yet.</p>
                )}
              </div>
            </article>
          </section>

          <section className="mt-8 rounded-2xl border border-[#24314a] bg-[#0b1326]/85 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-3xl font-semibold">Recent Activities</h2>
              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-[#8fa3c8] sm:inline">
                  Last refreshed: {formatDateTime(lastRefreshedAt.toISOString())}
                </span>
                <button
                  type="button"
                  onClick={handleManualRefresh}
                  className="inline-flex items-center gap-2 text-sm text-[#8fb2ff] hover:text-[#b9d0ff]"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                  {isRefreshing ? "Refreshing" : "Refresh"}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
                <thead>
                  <tr className="text-[#9cb0d5]">
                    <th className="px-3 py-2 font-medium">Action</th>
                    <th className="px-3 py-2 font-medium">Repository</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium">Cache</th>
                    <th className="px-3 py-2 font-medium">Duration</th>
                    <th className="px-3 py-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {activityRows.length > 0 ? (
                    activityRows.map((row) => (
                      <tr key={row.id} className="rounded-lg bg-[#0a1228]">
                        <td className="px-3 py-3 text-[#d7e4ff]">{row.action}</td>
                        <td className="px-3 py-3 text-[#c7d8f8]">{row.repository}</td>
                        <td className={`px-3 py-3 font-semibold ${getStatusTone(row.status)}`}>
                          {row.status}
                        </td>
                        <td className="px-3 py-3 text-[#c7d8f8]">{row.cache}</td>
                        <td className="px-3 py-3 text-[#c7d8f8]">{row.durationMs} ms</td>
                        <td className="px-3 py-3 text-[#c7d8f8]">{formatDateTime(row.time)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-3 py-8 text-center text-[#8fa3c8]">
                        No activity yet. Analyze a repository to see runtime stats here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
