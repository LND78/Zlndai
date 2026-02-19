import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, RotateCcw, Filter } from "lucide-react";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import { useSpacedRepetition } from "@/hooks/useSpacedRepetition";

interface Question {
  id: number;
  type: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: {
    correct: string;
    whyOthersWrong: { A: string; B: string; C: string; D: string };
  };
  difficultyLevel: string;
}

interface ChapterData {
  chapterName: string;
  questions: Question[];
}

type DifficultyFilter = "all" | "easy" | "medium" | "hard" | "ultra_hard";

export default function ChapterPage() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [showFilters, setShowFilters] = useState(false);
  const { recordReview, getReviewStats } = useSpacedRepetition();

  useEffect(() => {
    const loadChapter = async () => {
      try {
        const chapterNum = params?.slug?.replace("chapter", "") || "1";
        const response = await import(`@/data/chapter${chapterNum}.json`);
        setChapterData(response.default);
        setFilteredQuestions(response.default.questions);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load chapter:", error);
        setLoading(false);
      }
    };

    loadChapter();
  }, [params?.slug]);

  const applyDifficultyFilter = (filter: DifficultyFilter) => {
    setDifficultyFilter(filter);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setShowExplanation(false);

    if (!chapterData) return;

    if (filter === "all") {
      setFilteredQuestions(chapterData.questions);
    } else {
      setFilteredQuestions(
        chapterData.questions.filter((q) => q.difficultyLevel === filter)
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chapter...</p>
        </div>
      </div>
    );
  }

  if (!chapterData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Chapter Not Found</h1>
          <p className="text-gray-600 mb-6">The chapter you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")} className="w-full">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  const question = filteredQuestions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer;
  const reviewStats = getReviewStats(parseInt(params?.slug?.replace("chapter", "") || "1"));
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  const handleSelectAnswer = (option: string) => {
    if (!isAnswered) {
      setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: option });
      if (option === question.correctAnswer) {
        setScore(score + 1);
      }
      // Record in spaced repetition
      recordReview(
        question.id,
        parseInt(params?.slug?.replace("chapter", "") || "1"),
        option === question.correctAnswer
      );
    }
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{chapterData.chapterName}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Question {currentQuestion + 1} of {filteredQuestions.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{score}</p>
            <p className="text-xs text-gray-500">Score</p>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Filter className="w-4 h-4" />
            Filter: {difficultyFilter}
          </button>

          {showFilters && (
            <div className="mt-3 p-4 bg-white rounded-lg border border-gray-200 flex gap-2 flex-wrap">
              {(["all", "easy", "medium", "hard", "ultra_hard"] as DifficultyFilter[]).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      applyDifficultyFilter(filter);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      difficultyFilter === filter
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter === "ultra_hard" ? "Ultra Hard" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Review Stats */}
        {reviewStats.totalReviews > 0 && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-l-green-500">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-green-600">{reviewStats.totalReviews}</p>
              </div>
              <div>
                <p className="text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold text-blue-600">{reviewStats.accuracy.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-gray-600">For Review</p>
                <p className="text-2xl font-bold text-orange-600">{reviewStats.questionsForReview}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Progress Bar */}
        <ProgressBar progress={progress} />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <QuestionCard
          question={question}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onSelectAnswer={handleSelectAnswer}
          showExplanation={showExplanation}
          isAnswered={isAnswered}
        />

        {/* Explanation Toggle */}
        {isAnswered && (
          <Card className="p-6 mb-6 border-l-4 border-l-blue-500">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full text-left flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 transition"
            >
              <span>{showExplanation ? "Hide" : "Show"} Explanation</span>
              <ChevronRight
                className={`w-5 h-5 transition-transform ${
                  showExplanation ? "rotate-90" : ""
                }`}
              />
            </button>

            {showExplanation && (
              <div className="mt-4 space-y-4">
                <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
                  <p className={`font-semibold ${isCorrect ? "text-green-900" : "text-red-900"}`}>
                    {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                  </p>
                  <p className={`mt-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {question.explanation.correct}
                  </p>
                </div>

                {!isCorrect && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-900 mb-2">Why other options are wrong:</p>
                    <ul className="space-y-2 text-sm text-blue-800">
                      {Object.entries(question.explanation.whyOthersWrong).map(([key, value]) => (
                        value && (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentQuestion === filteredQuestions.length - 1 ? (
            <Button
              onClick={handleReset}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <RotateCcw className="w-4 h-4" />
              Restart Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Quiz Summary */}
        {currentQuestion === filteredQuestions.length - 1 && isAnswered && (
          <Card className="p-6 mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{score}</p>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">
                  {filteredQuestions.length - score}
                </p>
                <p className="text-sm text-gray-600">Incorrect</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {Math.round((score / filteredQuestions.length) * 100)}%
                </p>
                <p className="text-sm text-gray-600">Accuracy</p>
              </div>
            </div>
            <Button onClick={handleReset} className="w-full">
              Try Again
            </Button>
          </Card>
        )}

        {/* Credit */}
        <div className="text-center mt-8 py-4 text-xs text-gray-500">
          <p>Made with love by <span className="font-semibold text-blue-600">Naman</span></p>
        </div>
      </div>
    </div>
  );
}
