import { User, QuizHistory } from '../App';
import { ArrowLeft, Trophy, Target, Clock, TrendingUp, Calendar } from 'lucide-react';

interface MyPageProps {
  user: User | null;
  history: QuizHistory[];
  onBack: () => void;
}

export function MyPage({ user, history, onBack }: MyPageProps) {
  if (!user) {
    return null;
  }

  // Calculate statistics
  const totalQuizzes = history.length;
  const totalQuestions = history.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
  const totalCorrect = history.reduce((sum, quiz) => sum + quiz.score, 0);
  const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const totalTimeTaken = history.reduce((sum, quiz) => sum + quiz.timeTaken, 0);

  // Category statistics
  const categoryStats = history.reduce((acc, quiz) => {
    if (!acc[quiz.category]) {
      acc[quiz.category] = { count: 0, correct: 0, total: 0 };
    }
    acc[quiz.category].count++;
    acc[quiz.category].correct += quiz.score;
    acc[quiz.category].total += quiz.totalQuestions;
    return acc;
  }, {} as Record<string, { count: number; correct: number; total: number }>);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      history: '역사',
      science: '과학',
      geography: '지리',
      culture: '문화',
      entertainment: '엔터테인먼트',
      technology: '기술',
      general: '일반상식'
    };
    return names[category] || category;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>홈으로</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-purple-100">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">{totalQuizzes}</div>
              <div className="text-sm text-purple-100">완료한 퀴즈</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">{averageScore}%</div>
              <div className="text-sm text-purple-100">평균 정답률</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">{totalCorrect}</div>
              <div className="text-sm text-purple-100">맞은 문제</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">{formatTime(totalTimeTaken)}</div>
              <div className="text-sm text-purple-100">총 소요시간</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Statistics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                전체 통계
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700">평균 점수</span>
                  </div>
                  <span className="font-bold text-purple-600">{averageScore}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">총 문제 수</span>
                  </div>
                  <span className="font-bold text-blue-600">{totalQuestions}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">평균 시간</span>
                  </div>
                  <span className="font-bold text-green-600">
                    {totalQuizzes > 0 ? formatTime(Math.round(totalTimeTaken / totalQuizzes)) : '0초'}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">카테고리별 성적</h2>
              <div className="space-y-3">
                {Object.entries(categoryStats).map(([category, stats]) => {
                  const percentage = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={category} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {getCategoryName(category)}
                        </span>
                        <span className="text-sm font-bold text-purple-600">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{stats.count}개 퀴즈</span>
                        <span>{stats.correct}/{stats.total} 정답</span>
                      </div>
                    </div>
                  );
                })}
                {Object.keys(categoryStats).length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    아직 완료한 퀴즈가 없습니다
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quiz History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                퀴즈 기록
              </h2>
              
              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((quiz) => {
                    const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100);
                    const getScoreColor = (pct: number) => {
                      if (pct >= 80) return 'text-green-600 bg-green-50';
                      if (pct >= 60) return 'text-blue-600 bg-blue-50';
                      if (pct >= 40) return 'text-yellow-600 bg-yellow-50';
                      return 'text-red-600 bg-red-50';
                    };

                    return (
                      <div
                        key={quiz.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{quiz.quizTitle}</h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                              <span className="px-2 py-1 bg-gray-100 rounded">
                                {getCategoryName(quiz.category)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatTime(quiz.timeTaken)}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span>{formatDate(quiz.completedAt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-sm text-gray-600">정답률</div>
                              <div className={`text-2xl font-bold ${getScoreColor(percentage).split(' ')[0]}`}>
                                {percentage}%
                              </div>
                            </div>
                            <div className={`px-4 py-2 rounded-lg ${getScoreColor(percentage)}`}>
                              <div className="font-bold">{quiz.score}/{quiz.totalQuestions}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-gray-600 text-lg mb-2">아직 완료한 퀴즈가 없습니다</p>
                  <p className="text-gray-500 text-sm">첫 퀴즈를 풀어보세요!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
