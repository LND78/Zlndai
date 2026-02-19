import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, ArrowRight, Zap, Brain, Target } from "lucide-react";

const chapters = [
  { id: 1, name: "Chemical Reactions and Equations", icon: "⚗️" },
  { id: 2, name: "Acids, Bases and Salts", icon: "🧪" },
  { id: 3, name: "Metals and Non-metals", icon: "⚙️" },
  { id: 4, name: "Carbon and its Compounds", icon: "🔗" },
  { id: 5, name: "Life Processes", icon: "🧬" },
  { id: 6, name: "Control and Coordination", icon: "🧠" },
  { id: 7, name: "How do Organisms Reproduce?", icon: "🌱" },
  { id: 8, name: "Heredity", icon: "👨‍👩‍👧" },
  { id: 9, name: "Light – Reflection and Refraction", icon: "💡" },
  { id: 10, name: "The Human Eye and the Colourful World", icon: "👁️" },
  { id: 11, name: "Electricity", icon: "⚡" },
  { id: 12, name: "Magnetic Effects of Electric Current", icon: "🧲" },
  { id: 13, name: "Our Environment", icon: "🌍" },
];

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10" />
            <h1 className="text-4xl sm:text-5xl font-bold">Science MCQ Hub</h1>
          </div>
          <p className="text-lg text-blue-100 max-w-2xl">
            Master RBSE Class 10 Science with 390 carefully crafted multiple-choice questions covering all 13 chapters. Each question includes detailed explanations and difficulty levels.
          </p>
        </div>
      </div>

      {/* Dashboard Link */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            View Analytics
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition">
            <Brain className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Comprehensive Coverage</h3>
            <p className="text-gray-600 text-sm">30 questions per chapter, covering all concepts and high-weightage areas.</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-indigo-500 hover:shadow-lg transition">
            <Target className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Exam-Aligned</h3>
            <p className="text-gray-600 text-sm">Tricky questions with conceptual traps, assertion-reason, and numerical problems.</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500 hover:shadow-lg transition">
            <Zap className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Instant Feedback</h3>
            <p className="text-gray-600 text-sm">Get detailed explanations and track your progress with real-time scoring.</p>
          </Card>
        </div>

        {/* Chapters Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Select a Chapter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className="p-6 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group"
                onClick={() => navigate(`/chapter/chapter${chapter.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{chapter.icon}</span>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    30 Q's
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {chapter.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">Chapter {chapter.id}</p>
                <Button
                  className="w-full group-hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/chapter/chapter${chapter.id}`);
                  }}
                >
                  Start Quiz
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">13</p>
              <p className="text-gray-600 mt-2">Chapters</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-600">390</p>
              <p className="text-gray-600 mt-2">Questions</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">100%</p>
              <p className="text-gray-600 mt-2">RBSE Aligned</p>
            </div>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Question Types Included:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <li>✓ Conceptual trap-based questions</li>
            <li>✓ Assertion-Reason format</li>
            <li>✓ Numerical problems</li>
            <li>✓ Real-life applications</li>
            <li>✓ Multi-concept integration</li>
            <li>✓ Detailed explanations</li>
          </ul>
        </div>

        {/* Credit Footer */}
        <div className="mt-8 text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">Made with ❤️ by <span className="font-semibold text-blue-600">Naman</span></p>
          <p className="text-xs text-gray-500 mt-1">RBSE Class 10 Science MCQ Hub | 650 Questions | 13 Chapters</p>
        </div>
      </div>
    </div>
  );
}
