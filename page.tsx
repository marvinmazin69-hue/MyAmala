"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Grid, List, Download, Upload } from "lucide-react";
import { TopHeader } from "@/components/layout/top-header";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const mockPolicies = [
  {
    id: "1",
    title: "Student Code of Conduct",
    fileType: "pdf",
    lastModifiedAt: "2026-05-15T10:00:00Z",
    uploadedBy: "Amala Admin",
  },
  {
    id: "2",
    title: "Academic Integrity Policy",
    fileType: "pdf",
    lastModifiedAt: "2026-04-20T14:30:00Z",
    uploadedBy: "Academic Affairs",
  },
  {
    id: "3",
    title: "Attendance & Punctuality Guidelines",
    fileType: "pdf",
    lastModifiedAt: "2026-03-10T09:00:00Z",
    uploadedBy: "School Administration",
  },
  {
    id: "4",
    title: "Portfolio Submission Standards",
    fileType: "pdf",
    lastModifiedAt: "2026-06-01T11:00:00Z",
    uploadedBy: "Academic Affairs",
  },
  {
    id: "5",
    title: "Community Forum Guidelines",
    fileType: "pdf",
    lastModifiedAt: "2026-06-10T16:00:00Z",
    uploadedBy: "Amala Admin",
  },
  {
    id: "6",
    title: "Technology Use Policy",
    fileType: "pdf",
    lastModifiedAt: "2026-02-28T08:00:00Z",
    uploadedBy: "IT Department",
  },
];

export default function PoliciesPage() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filtered = mockPolicies.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#080B14]">
      <TopHeader pageName="School Policies & Resources" />

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">
              School Policies & Resources
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Official documents and school policies
            </p>
          </div>
          {/* Mentor only */}
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Upload className="h-3.5 w-3.5" />}
          >
            Upload document
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6">
          <SearchBar
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            className="flex-1 max-w-sm"
          />
          <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-slate-800/40 p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Documents */}
        {viewMode === "list" ? (
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 hidden md:table-cell">
                    Last Modified
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 hidden lg:table-cell">
                    Uploaded By
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((doc, i) => (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/20 shrink-0">
                          <FileText className="h-4 w-4 text-red-400" />
                        </div>
                        <span className="text-sm font-medium text-slate-200">
                          {doc.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden md:table-cell">
                      {formatDate(doc.lastModifiedAt)}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden lg:table-cell">
                      {doc.uploadedBy}
                    </td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors">
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-sm">
                No documents found
              </div>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              >
                <Card hover className="p-4 flex flex-col gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/20">
                    <FileText className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200 leading-snug line-clamp-2">
                      {doc.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatDate(doc.lastModifiedAt)}
                    </p>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors mt-auto">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
