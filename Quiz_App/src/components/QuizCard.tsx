import React from 'react';
import { Clock, Users, Trophy } from 'lucide-react';
import { Quiz } from '../types/Quiz';

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStart }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className={`absolute inset-0 bg-gradient-to-br ${quiz.color.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative p-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${quiz.color.gradient} flex items-center justify-center mb-4`}>
          <Trophy className="w-6 h-6 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
          {quiz.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {quiz.description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <Users className="w-4 h-4" />
              <span className="text-sm">{quiz.questions.length} questions</span>
            </div>
            
            {quiz.timeLimit && (
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{formatTime(quiz.timeLimit)}</span>
              </div>
            )}
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${quiz.color.secondary} text-gray-700`}>
            {quiz.category}
          </span>
        </div>
        
        <button
          onClick={() => onStart(quiz)}
          className={`w-full py-3 px-4 bg-gradient-to-r ${quiz.color.gradient} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200`}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;