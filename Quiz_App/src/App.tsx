import React, { useState, useEffect } from 'react';
import QuizSelection from './components/QuizSelection';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';
import { Quiz, QuizResult } from './types/Quiz';
import { quizzes } from './data/quizzes';
import { useTimer } from './hooks/useTimer';

type AppState = 'selection' | 'quiz' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('selection');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  const { timeRemaining, start: startTimer, reset: resetTimer } = useTimer(
    selectedQuiz?.timeLimit || 0,
    () => handleTimeUp()
  );

  const handleSelectQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    setStartTime(Date.now());
    setCurrentState('quiz');
    
    if (quiz.timeLimit) {
      resetTimer(quiz.timeLimit);
      startTimer();
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < (selectedQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const handleTimeUp = () => {
    finishQuiz(userAnswers);
  };

  const finishQuiz = (answers: number[]) => {
    if (!selectedQuiz) return;

    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);
    
    let score = 0;
    const correctAnswers: number[] = [];
    const wrongAnswers: number[] = [];

    selectedQuiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
        correctAnswers.push(index);
      } else {
        wrongAnswers.push(index);
      }
    });

    const result: QuizResult = {
      score,
      totalQuestions: selectedQuiz.questions.length,
      timeSpent,
      correctAnswers,
      wrongAnswers
    };

    setQuizResult(result);
    setCurrentState('results');
  };

  const handleRestart = () => {
    if (selectedQuiz) {
      handleSelectQuiz(selectedQuiz);
    }
  };

  const handleBackToHome = () => {
    setCurrentState('selection');
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    resetTimer();
  };

  if (currentState === 'selection') {
    return <QuizSelection quizzes={quizzes} onSelectQuiz={handleSelectQuiz} />;
  }

  if (currentState === 'quiz' && selectedQuiz) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    return (
      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={selectedQuiz.questions.length}
        onAnswer={handleAnswer}
        timeRemaining={selectedQuiz.timeLimit ? timeRemaining : undefined}
        quizColor={selectedQuiz.color}
      />
    );
  }

  if (currentState === 'results' && quizResult && selectedQuiz) {
    return (
      <QuizResults
        result={quizResult}
        quiz={selectedQuiz}
        onRestart={handleRestart}
        onHome={handleBackToHome}
      />
    );
  }

  return null;
}

export default App;