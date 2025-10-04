//src/app/placementOpTl/components/overallCard.js
"use client";
import React, { useMemo } from "react";

const domainsList = [
  { key: "fullstack", label: "FSD", color: "text-blue-600", bg: "bg-blue-50" },
  {
    key: "dataanalytics",
    label: "DADS",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    key: "marketing",
    label: "DM",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  { key: "sap", label: "SAP", color: "text-yellow-600", bg: "bg-yellow-50" },
  {
    key: "banking",
    label: "BFS",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  { key: "devops", label: "DV", color: "text-pink-600", bg: "bg-pink-50" },
];

const domainPrefixMap = {
  fullstack: "FS",
  dataanalytics: "DA",
  banking: "BK",
  marketing: "MK",
  sap: "SAP",
  devops: "DV",
};

// flexible prefix matcher for batchName like "FS01", "FS-01", "FS_01", "FS 01"
function matchesPrefix(batchName, prefix) {
  if (!batchName || !prefix) return false;
  const bn = String(batchName).trim().toUpperCase();
  const p = String(prefix).trim().toUpperCase();
  if (!bn || !p) return false;
  if (bn.startsWith(p)) return true;
  // regex: prefix then optional -, _, space or digits (e.g. FS-01, FS_01, FS 01, FS01)
  const re = new RegExp(`^${p}(?:[\\- _\\d].*)?$`);
  if (re.test(bn)) return true;
  // final fallback: contains prefix anywhere
  return bn.includes(p);
}

// map raw domain strings (from DB) -> our keys
function mapDomainToKey(domain) {
  if (!domain) return null;
  const d = String(domain).trim();
  const map = {
    "Full Stack": "fullstack",
    "Full Stack Development": "fullstack",
    "Data Analytics": "dataanalytics",
    "Data Analytics & Science": "dataanalytics",
    "Digital Marketing": "marketing",
    Marketing: "marketing",
    SAP: "sap",
    Banking: "banking",
    "Banking & Financial Services": "banking",
    DevOps: "devops",
  };
  if (map[d]) return map[d];
  // fallback: simple heuristics
  const lower = d.toLowerCase();
  if (lower.includes("full")) return "fullstack";
  if (lower.includes("data")) return "dataanalytics";
  if (lower.includes("market")) return "marketing";
  if (lower.includes("bank")) return "banking";
  if (lower.includes("sap")) return "sap";
  if (lower.includes("dev")) return "devops";
  return null;
}

export default function OverallCard({ title = "Overall", studentData = [] }) {
  const { counts, totalCount, debug } = useMemo(() => {
    const initCounts = domainsList.reduce(
      (acc, d) => ({ ...acc, [d.key]: 0 }),
      {}
    );
    // defensive checks
    if (!Array.isArray(studentData)) {
      return {
        counts: initCounts,
        totalCount: 0,
        debug: { reason: "not-array" },
      };
    }
    if (studentData.length === 0) {
      return { counts: initCounts, totalCount: 0, debug: { reason: "empty" } };
    }

    // detect which fields exist on rows
    const sample = studentData.find(Boolean) || {};
    const hasDomainField =
      typeof sample.domain === "string" && sample.domain.trim().length > 0;
    const hasBatchName =
      typeof sample.batchName === "string" &&
      sample.batchName.trim().length > 0;
    const hasBatch =
      typeof sample.batch === "string" && sample.batch.trim().length > 0;

    const counts = { ...initCounts };

    if (hasDomainField) {
      // count by explicit domain field
      studentData.forEach((s) => {
        const key = mapDomainToKey(s.domain);
        if (key && counts.hasOwnProperty(key)) counts[key] += 1;
      });
      return {
        counts,
        totalCount: Object.values(counts).reduce((a, b) => a + b, 0),
        debug: { detection: "domainField", sample: studentData.slice(0, 3) },
      };
    }

    // fallback to batchName or batch prefix matching
    if (hasBatchName || hasBatch) {
      studentData.forEach((s) => {
        const bn = hasBatchName ? s.batchName : s.batch;
        domainsList.forEach((d) => {
          if (matchesPrefix(bn, domainPrefixMap[d.key])) {
            counts[d.key] += 1;
          }
        });
      });
      return {
        counts,
        totalCount: Object.values(counts).reduce((a, b) => a + b, 0),
        debug: {
          detection: hasBatchName ? "batchName" : "batch",
          sample: studentData.slice(0, 3),
        },
      };
    }

    // last resort: look for other fields that might contain course/program text
    studentData.forEach((s) => {
      const maybe =
        s.domain ||
        s.course ||
        s.program ||
        s.center ||
        s.batchName ||
        s.batch ||
        "";
      const key = mapDomainToKey(maybe);
      if (key && counts.hasOwnProperty(key)) counts[key] += 1;
    });

    return {
      counts,
      totalCount: Object.values(counts).reduce((a, b) => a + b, 0),
      debug: { detection: "heuristic", sample: studentData.slice(0, 3) },
    };
  }, [studentData]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-[#a17640]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        {title}
        <span className="ml-2 text-lg font-bold text-gray-800">
          ({totalCount})
        </span>
      </h2>

      <div className="grid grid-cols-6 gap-2 mt-4">
        {domainsList.map((domain) => (
          <div
            key={domain.key}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 hover:shadow-md ${domain.bg}`}
          >
            <span className={`text-xs font-semibold ${domain.color} mb-1`}>
              {domain.label}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {counts[domain.key] || 0}
            </span>
          </div>
        ))}
      </div>

      {/* debug hint when nothing counted */}
      {totalCount === 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          <div className="mb-2 font-semibold">
            Debug: no domain counts detected
          </div>
          <div className="text-xs mb-2">
            Detection mode: <strong>{debug?.detection || debug?.reason}</strong>
          </div>
          <div className="text-xs">
            Preview of up to first 3 rows returned by API:
          </div>
          <pre className="text-xs mt-2 max-h-40 overflow-auto bg-white p-2 rounded border text-gray-700">
            {JSON.stringify(debug?.sample || [], null, 2)}
          </pre>
          <div className="mt-2 text-xs text-gray-600">
            {
              "If the preview doesn't show `batchName` or `domain`, update the backend to include them (or pass the right prop to this card)."
            }
          </div>
        </div>
      )}
    </div>
  );
}
