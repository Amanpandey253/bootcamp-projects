import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../types/Quiz';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
  timeRemaining?: number;
  quizColor: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  timeRemaining,
  quizColor
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question.id]);

  const handleAnswerClick = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {questionNumber} of {totalQuestions}
            </span>
            {timeRemaining !== undefined && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 bg-gradient-to-r ${quizColor.gradient} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed">
            {question.question}
          </h2>

          <div className="grid gap-4">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200";
              
              if (!isAnswered) {
                buttonClass += " border-gray-200 hover:border-gray-300 hover:bg-gray-50";
              } else {
                if (index === question.correctAnswer) {
                  buttonClass += " border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  buttonClass += " border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += " border-gray-200 bg-gray-50 text-gray-500";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        !isAnswered 
                          ? 'bg-gray-100 text-gray-600' 
                          : index === question.correctAnswer
                            ? 'bg-green-500 text-white'
                            : index === selectedAnswer
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg font-medium">{option}</span>
                    </div>
                    
                    {isAnswered && (
                      <div className="flex items-center">
                        {index === question.correctAnswer ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : index === selectedAnswer ? (
                          <XCircle className="w-6 h-6 text-red-500" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && question.explanation && (
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Explanation</h3>
              <p className="text-blue-800">{question.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;