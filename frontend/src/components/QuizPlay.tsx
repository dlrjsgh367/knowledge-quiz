import { useState, useEffect } from 'react';
import { Quiz } from '../App';
import { Clock, X, CheckCircle, XCircle } from 'lucide-react';

interface QuizPlayProps {
  quiz: Quiz;
  onComplete: (score: number, total: number, timeTaken: number) => void;
  onQuit: () => void;
}

export function QuizPlay({ quiz, onComplete, onQuit }: QuizPlayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);
      
      if (isLastQuestion) {
        setShowResult(true);
        setTimeout(() => {
          const score = newAnswers.reduce((acc, answer, idx) => {
            return acc + (answer === quiz.questions[idx].correctAnswer ? 1 : 0);
          }, 0);
          const timeTaken = Math.floor((Date.now() - startTime) / 1000);
          onComplete(score, quiz.questions.length, timeTaken);
        }, 1500);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="font-semibold text-gray-900">{quiz.title}</h1>
              <p className="text-sm text-gray-600">
                문제 {currentQuestionIndex + 1} / {quiz.questions.length}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5" />
                <span className="font-mono font-semibold">{formatTime(timeElapsed)}</span>
              </div>
              <button
                onClick={onQuit}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="퀴즈 종료"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-purple-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-3xl w-full">
          {!showResult ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                  Question {currentQuestionIndex + 1}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-purple-600 bg-purple-50 shadow-md transform scale-[1.02]'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                        selectedAnswer === index
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-300 text-gray-500'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {isLastQuestion ? '완료' : '다음'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">퀴즈 완료!</h2>
                <p className="text-gray-600">결과를 집계하고 있습니다...</p>
              </div>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
