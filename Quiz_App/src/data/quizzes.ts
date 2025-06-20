import { Quiz } from '../types/Quiz';

export const quizzes: Quiz[] = [
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    description: 'Test your knowledge across various topics',
    category: 'Mixed',
    timeLimit: 300, // 5 minutes
    color: {
      primary: 'bg-blue-500',
      secondary: 'bg-blue-100',
      gradient: 'from-blue-400 to-purple-600'
    },
    questions: [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
        explanation: 'Paris is the capital and most populous city of France.'
      },
      {
        id: 2,
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
        explanation: 'Mars is called the Red Planet due to iron oxide on its surface.'
      },
      {
        id: 3,
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 2,
        explanation: 'Leonardo da Vinci painted the Mona Lisa between 1503-1519.'
      },
      {
        id: 4,
        question: 'What is the largest mammal in the world?',
        options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
        correctAnswer: 1,
        explanation: 'The Blue Whale is the largest animal ever known to have lived on Earth.'
      },
      {
        id: 5,
        question: 'In which year did World War II end?',
        options: ['1944', '1945', '1946', '1947'],
        correctAnswer: 1,
        explanation: 'World War II ended in 1945 with the surrender of Japan.'
      }
    ]
  },
  {
    id: 'science',
    title: 'Science & Nature',
    description: 'Explore the wonders of science and nature',
    category: 'Science',
    timeLimit: 240, // 4 minutes
    color: {
      primary: 'bg-green-500',
      secondary: 'bg-green-100',
      gradient: 'from-green-400 to-teal-600'
    },
    questions: [
      {
        id: 1,
        question: 'What is the chemical symbol for gold?',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        correctAnswer: 2,
        explanation: 'Au comes from the Latin word "aurum" meaning gold.'
      },
      {
        id: 2,
        question: 'How many bones are in an adult human body?',
        options: ['196', '206', '216', '226'],
        correctAnswer: 1,
        explanation: 'An adult human skeleton has 206 bones.'
      },
      {
        id: 3,
        question: 'What gas do plants absorb from the atmosphere during photosynthesis?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 2,
        explanation: 'Plants absorb CO₂ and release oxygen during photosynthesis.'
      },
      {
        id: 4,
        question: 'What is the speed of light in vacuum?',
        options: ['300,000 km/s', '299,792,458 m/s', '186,000 miles/s', 'All of the above'],
        correctAnswer: 3,
        explanation: 'All measurements represent the same speed of light, just in different units.'
      },
      {
        id: 5,
        question: 'Which organ in the human body produces insulin?',
        options: ['Liver', 'Kidney', 'Pancreas', 'Heart'],
        correctAnswer: 2,
        explanation: 'The pancreas produces insulin to regulate blood sugar levels.'
      }
    ]
  },
  {
    id: 'history',
    title: 'World History',
    description: 'Journey through time and historical events',
    category: 'History',
    timeLimit: 360, // 6 minutes
    color: {
      primary: 'bg-amber-500',
      secondary: 'bg-amber-100',
      gradient: 'from-amber-400 to-orange-600'
    },
    questions: [
      {
        id: 1,
        question: 'Who was the first person to walk on the moon?',
        options: ['Buzz Aldrin', 'Neil Armstrong', 'Michael Collins', 'Yuri Gagarin'],
        correctAnswer: 1,
        explanation: 'Neil Armstrong was the first human to step on the Moon on July 20, 1969.'
      },
      {
        id: 2,
        question: 'In which year did the Berlin Wall fall?',
        options: ['1987', '1988', '1989', '1990'],
        correctAnswer: 2,
        explanation: 'The Berlin Wall fell on November 9, 1989.'
      },
      {
        id: 3,
        question: 'Which ancient wonder of the world was located in Alexandria?',
        options: ['Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens', 'Temple of Artemis'],
        correctAnswer: 1,
        explanation: 'The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World.'
      },
      {
        id: 4,
        question: 'Who was the last Pharaoh of Egypt?',
        options: ['Nefertiti', 'Cleopatra VII', 'Hatshepsut', 'Ankhesenamun'],
        correctAnswer: 1,
        explanation: 'Cleopatra VII was the last active pharaoh of Ptolemaic Egypt.'
      },
      {
        id: 5,
        question: 'The Magna Carta was signed in which year?',
        options: ['1205', '1215', '1225', '1235'],
        correctAnswer: 1,
        explanation: 'The Magna Carta was signed by King John of England in 1215.'
      }
    ]
  },
  {
    id: 'sports',
    title: 'Sports & Recreation',
    description: 'Test your sports knowledge and trivia',
    category: 'Sports',
    timeLimit: 180, // 3 minutes
    color: {
      primary: 'bg-red-500',
      secondary: 'bg-red-100',
      gradient: 'from-red-400 to-pink-600'
    },
    questions: [
      {
        id: 1,
        question: 'How many players are on a basketball team on the court at one time?',
        options: ['4', '5', '6', '7'],
        correctAnswer: 1,
        explanation: 'Each basketball team has 5 players on the court at any given time.'
      },
      {
        id: 2,
        question: 'In which sport would you perform a slam dunk?',
        options: ['Volleyball', 'Tennis', 'Basketball', 'Badminton'],
        correctAnswer: 2,
        explanation: 'A slam dunk is a basketball shot where the player jumps and forces the ball through the hoop.'
      },
      {
        id: 3,
        question: 'How often are the Summer Olympic Games held?',
        options: ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years'],
        correctAnswer: 2,
        explanation: 'The Summer Olympic Games are held every 4 years.'
      },
      {
        id: 4,
        question: 'What is the maximum score possible in ten-pin bowling?',
        options: ['250', '270', '290', '300'],
        correctAnswer: 3,
        explanation: 'A perfect game in bowling scores 300 points (12 strikes).'
      },
      {
        id: 5,
        question: 'In soccer, how many players are on the field for each team?',
        options: ['10', '11', '12', '13'],
        correctAnswer: 1,
        explanation: 'Each soccer team fields 11 players, including the goalkeeper.'
      }
    ]
  }
];