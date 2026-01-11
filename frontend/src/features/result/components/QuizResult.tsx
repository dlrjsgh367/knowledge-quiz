import { Trophy, Clock, Target, Home, RotateCcw, Share2 } from 'lucide-react';

interface QuizResultProps {
  score: number;
  total: number;
  timeTaken: number;
  quizTitle: string;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export function QuizResult({ score, total, timeTaken, quizTitle, onPlayAgain, onGoHome }: QuizResultProps) {
  const percentage = Math.round((score / total) * 100);
  
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { text: '완벽해요!', emoji: '🎉', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 70) return { text: '훌륭해요!', emoji: '🌟', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (percentage >= 50) return { text: '잘했어요!', emoji: '👍', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { text: '다시 도전해보세요!', emoji: '💪', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  };

  const performance = getPerformanceLevel();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`${performance.bgColor} p-8 text-center`}>
            <div className="text-6xl mb-4">{performance.emoji}</div>
            <h1 className={`text-4xl font-bold mb-2 ${performance.color}`}>
              {performance.text}
            </h1>
            <p className="text-gray-700">{quizTitle}</p>
          </div>

          {/* Score Circle */}
          <div className="p-8 text-center">
            <div className="relative inline-flex items-center justify-center mb-6">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#9333ea"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute">
                <div className="text-5xl font-bold text-purple-600">{percentage}%</div>
                <div className="text-gray-600 text-sm mt-1">정답률</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex justify-center mb-2">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{score}</div>
                <div className="text-sm text-gray-600">정답</div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex justify-center mb-2">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{total}</div>
                <div className="text-sm text-gray-600">전체</div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex justify-center mb-2">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-lg font-bold text-green-600 mb-1">{formatTime(timeTaken)}</div>
                <div className="text-sm text-gray-600">소요시간</div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">결과 요약</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">맞은 문제:</span>
                  <span className="font-semibold text-green-600">{score}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">틀린 문제:</span>
                  <span className="font-semibold text-red-600">{total - score}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 소요 시간:</span>
                  <span className="font-semibold text-gray-900">{Math.round(timeTaken / total)}초/문제</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onPlayAgain}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
              >
                <RotateCcw className="w-5 h-5" />
                <span>다른 퀴즈 풀기</span>
              </button>
              <button
                onClick={onGoHome}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                <Home className="w-5 h-5" />
                <span>홈으로</span>
              </button>
            </div>

            {/* Share Button */}
            <button
              onClick={() => {
                const text = `${quizTitle} 퀴즈에서 ${percentage}점을 받았어요! 🎉`;
                if (navigator.share) {
                  navigator.share({ text });
                } else {
                  navigator.clipboard.writeText(text);
                  alert('결과가 클립보드에 복사되었습니다!');
                }
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 text-purple-600 border-2 border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>결과 공유하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
