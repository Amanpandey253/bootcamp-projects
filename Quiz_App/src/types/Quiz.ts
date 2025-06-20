export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  timeLimit?: number; // in seconds
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  correctAnswers: number[];
  wrongAnswers: number[];
}