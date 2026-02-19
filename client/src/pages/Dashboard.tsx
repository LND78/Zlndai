import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChapterStats {
  chapter: string;
  questions: number;
  difficulty: { easy: number; medium: number; hard: number };
  types: { conceptual_trap: number; assertion_reason: number; numerical: number; real_life_application: number; multi_concept: number };
}

const chapterData: ChapterStats[] = [
  {
    chapter: "Ch 1: Chemical Reactions",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 2: Acids, Bases & Salts",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 3: Metals & Non-metals",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 4: Carbon & Compounds",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 5: Life Processes",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 6: Control & Coordination",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 7: Reproduction",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 8: Heredity",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 9: Light",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 10: Human Eye",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 11: Electricity",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 12: Magnetism",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  },
  {
    chapter: "Ch 13: Environment",
    questions: 30,
    difficulty: { easy: 10, medium: 10, hard: 10 },
    types: { conceptual_trap: 10, assertion_reason: 5, numerical: 5, real_life_application: 5, multi_concept: 5 }
  }
];

const difficultyData = [
  { name: "Easy", value: 130, color: "#10b981" },
  { name: "Medium", value: 130, color: "#f59e0b" },
  { name: "Hard", value: 130, color: "#ef4444" }
];

const questionTypeData = [
  { name: "Conceptual Trap", value: 130 },
  { name: "Assertion-Reason", value: 65 },
  { name: "Numerical", value: 65 },
  { name: "Real-life App", value: 65 },
  { name: "Multi-concept", value: 65 }
];

const cumulativeData = [
  { chapter: "Ch 1", total: 30, cumulative: 30 },
  { chapter: "Ch 2", total: 30, cumulative: 60 },
  { chapter: "Ch 3", total: 30, cumulative: 90 },
  { chapter: "Ch 4", total: 30, cumulative: 120 },
  { chapter: "Ch 5", total: 30, cumulative: 150 },
  { chapter: "Ch 6", total: 30, cumulative: 180 },
  { chapter: "Ch 7", total: 30, cumulative: 210 },
  { chapter: "Ch 8", total: 30, cumulative: 240 },
  { chapter: "Ch 9", total: 30, cumulative: 270 },
  { chapter: "Ch 10", total: 30, cumulative: 300 },
  { chapter: "Ch 11", total: 30, cumulative: 330 },
  { chapter: "Ch 12", total: 30, cumulative: 360 },
  { chapter: "Ch 13", total: 30, cumulative: 390 }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">MCQ Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive overview of all 390 Science MCQs across 13 chapters</p>
      </div>

      {/* Key Metrics */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm font-medium opacity-90">Total Questions</p>
          <p className="text-4xl font-bold mt-2">390</p>
          <p className="text-xs mt-2 opacity-75">30 per chapter</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <p className="text-sm font-medium opacity-90">Chapters</p>
          <p className="text-4xl font-bold mt-2">13</p>
          <p className="text-xs mt-2 opacity-75">RBSE Class 10</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-sm font-medium opacity-90">Question Types</p>
          <p className="text-4xl font-bold mt-2">5</p>
          <p className="text-xs mt-2 opacity-75">Diverse formats</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm font-medium opacity-90">Difficulty Levels</p>
          <p className="text-4xl font-bold mt-2">3</p>
          <p className="text-xs mt-2 opacity-75">Easy, Medium, Hard</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Difficulty Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Difficulty Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Question Type Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Question Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={questionTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Cumulative Questions */}
      <div className="max-w-7xl mx-auto mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Cumulative Question Coverage</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="chapter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
                activeDot={{ r: 7 }}
                name="Cumulative Questions"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Chapter Breakdown */}
      <div className="max-w-7xl mx-auto">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Chapter Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Chapter</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Questions</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Easy</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Medium</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Hard</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {chapterData.map((ch, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50 transition">
                    <td className="py-3 px-4 text-gray-900 font-medium">{ch.chapter}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{ch.questions}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {ch.difficulty.easy}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        {ch.difficulty.medium}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                        {ch.difficulty.hard}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-3">About This Dashboard</h3>
        <p className="text-gray-600 text-sm">
          This comprehensive MCQ hub contains 650 carefully curated questions across 13 RBSE Class 10 Science chapters. Each question is designed to test conceptual understanding, includes detailed explanations, and covers diverse question types including conceptual traps, assertion-reason formats, numerical problems, real-life applications, and multi-concept integration.
        </p>
        <p className="text-sm text-gray-600 mt-4">Made with love by <span className="font-semibold text-blue-600">Naman</span></p>
      </div>
    </div>
  );
}
