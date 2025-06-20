import React from 'react';
import { Trophy, RotateCcw, Home, Star, Clock, Target } from 'lucide-react';
import { QuizResult, Quiz } from '../types/Quiz';

interface QuizResultsProps {
  result: QuizResult;
  quiz: Quiz;
  onRestart: () => void;
  onHome: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, quiz, onRestart, onHome }) => {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! You're a quiz master!", emoji: "🏆", color: "text-yellow-600" };
    if (percentage >= 80) return { message: "Excellent work! Keep it up!", emoji: "🌟", color: "text-green-600" };
    if (percentage >= 70) return { message: "Great job! You're doing well!", emoji: "👏", color: "text-blue-600" };
    if (percentage >= 60) return { message: "Good effort! Room for improvement!", emoji: "👍", color: "text-indigo-600" };
    return { message: "Keep practicing! You'll improve!", emoji: "💪", color: "text-purple-600" };
  };

  const performance = getPerformanceMessage();
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getStarRating = () => {
    if (percentage >= 90) return 5;
    if (percentage >= 80) return 4;
    if (percentage >= 70) return 3;
    if (percentage >= 60) return 2;
    return 1;
  };

  const stars = getStarRating();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${quiz.color.gradient} p-8 text-center text-white`}>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-white/90">{quiz.title}</p>
          </div>

          {/* Results */}
          <div className="p-8">
            {/* Score Circle */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${percentage * 3.39} 339`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{percentage}%</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Message */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-2">{performance.emoji}</div>
              <h2 className={`text-xl font-bold ${performance.color} mb-2`}>
                {performance.message}
              </h2>
              
              {/* Star Rating */}
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{result.score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{formatTime(result.timeSpent)}</div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{result.totalQuestions}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onRestart}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 bg-gradient-to-r ${quiz.color.gradient} text-white font-semibold rounded-2xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200`}
              >
                <RotateCcw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={onHome}
                className="flex-1 flex items-center justify-center space-x-2 py-4 px-6 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                <Home className="w-5 h-5" />
                <span>Back to Quizzes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;