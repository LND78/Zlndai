import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onSelectAnswer: (option: string) => void;
  showExplanation: boolean;
  isAnswered: boolean;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  showExplanation,
  isAnswered,
}: QuestionCardProps) {
  const options = ["A", "B", "C", "D"] as const;

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOptionStyle = (option: string) => {
    const isSelected = selectedAnswer === option;
    const isCorrect = option === question.correctAnswer;

    if (!isAnswered) {
      return isSelected
        ? "border-2 border-blue-500 bg-blue-50"
        : "border-2 border-gray-200 hover:border-gray-300";
    }

    if (isCorrect) {
      return "border-2 border-green-500 bg-green-50";
    }

    if (isSelected && !isCorrect) {
      return "border-2 border-red-500 bg-red-50";
    }

    return "border-2 border-gray-200";
  };

  return (
    <Card className="p-8 mb-6 shadow-lg">
      {/* Question Type & Difficulty */}
      <div className="flex items-center justify-between mb-6">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {question.type.replace(/_/g, " ")}
        </span>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficultyLevel)}`}>
          {question.difficultyLevel}
        </span>
      </div>

      {/* Question Text */}
      <h2 className="text-xl font-bold text-gray-900 mb-8 leading-relaxed">
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelectAnswer(option)}
            disabled={isAnswered}
            className={`w-full p-4 text-left rounded-lg transition-all ${getOptionStyle(option)} ${
              isAnswered ? "cursor-default" : "cursor-pointer"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current font-semibold">
                  {option}
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-gray-900 font-medium">
                  {question.options[option as keyof typeof question.options]}
                </p>
              </div>
              {isAnswered && option === question.correctAnswer && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
                    ✓
                  </span>
                </div>
              )}
              {isAnswered && selectedAnswer === option && option !== question.correctAnswer && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white">
                    ✗
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Answer Status */}
      {isAnswered && (
        <div className={`mt-6 p-4 rounded-lg text-center font-semibold ${
          selectedAnswer === question.correctAnswer
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}>
          {selectedAnswer === question.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
        </div>
      )}
    </Card>
  );
}
