import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Auth } from './components/Auth';
import { QuizSelection } from './components/QuizSelection';
import { QuizPlay } from './components/QuizPlay';
import { QuizResult } from './components/QuizResult';
import { MyPage } from './components/MyPage';

export type Screen = 'home' | 'auth' | 'quiz-selection' | 'quiz-play' | 'quiz-result' | 'mypage';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizHistory {
  id: string;
  quizId: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  timeTaken: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number; timeTaken: number } | null>(null);
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);

  // Load user and history from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('quizAppUser');
    const savedHistory = localStorage.getItem('quizAppHistory');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('quizAppUser', JSON.stringify(userData));
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('quizAppUser');
    setCurrentScreen('home');
  };

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentScreen('quiz-play');
  };

  const handleQuizComplete = (score: number, total: number, timeTaken: number) => {
    setQuizResult({ score, total, timeTaken });
    
    // Save to history
    if (selectedQuiz && user) {
      const newHistory: QuizHistory = {
        id: Date.now().toString(),
        quizId: selectedQuiz.id,
        quizTitle: selectedQuiz.title,
        category: selectedQuiz.category,
        score,
        totalQuestions: total,
        completedAt: new Date(),
        timeTaken
      };
      
      const updatedHistory = [newHistory, ...quizHistory];
      setQuizHistory(updatedHistory);
      localStorage.setItem('quizAppHistory', JSON.stringify(updatedHistory));
    }
    
    setCurrentScreen('quiz-result');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home 
            user={user}
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        );
      case 'auth':
        return (
          <Auth 
            onLogin={handleLogin}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'quiz-selection':
        return (
          <QuizSelection 
            user={user}
            onQuizSelect={handleQuizSelect}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'quiz-play':
        return selectedQuiz ? (
          <QuizPlay 
            quiz={selectedQuiz}
            onComplete={handleQuizComplete}
            onQuit={() => setCurrentScreen('quiz-selection')}
          />
        ) : null;
      case 'quiz-result':
        return quizResult && selectedQuiz ? (
          <QuizResult 
            score={quizResult.score}
            total={quizResult.total}
            timeTaken={quizResult.timeTaken}
            quizTitle={selectedQuiz.title}
            onPlayAgain={() => setCurrentScreen('quiz-selection')}
            onGoHome={() => setCurrentScreen('home')}
          />
        ) : null;
      case 'mypage':
        return (
          <MyPage 
            user={user}
            history={quizHistory}
            onBack={() => setCurrentScreen('home')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {renderScreen()}
    </div>
  );
}
