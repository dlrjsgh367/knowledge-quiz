import { User, Screen } from '../App';
import { Play, User as UserIcon, LogOut, Trophy } from 'lucide-react';

interface HomeProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function Home({ user, onNavigate, onLogout }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">퀴즈 마스터</h1>
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('mypage')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <UserIcon className="w-5 h-5" />
                <span>{user.username}</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('auth')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              로그인
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-6">
              <Trophy className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              퀴즈로 배우는 즐거움
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              다양한 카테고리의 퀴즈를 풀며 지식을 넓혀보세요
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => user ? onNavigate('quiz-selection') : onNavigate('auth')}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Play className="w-6 h-6" />
              <span className="text-lg font-semibold">퀴즈 시작하기</span>
            </button>
            
            {!user && (
              <button
                onClick={() => onNavigate('auth')}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border-2 border-purple-600"
              >
                <UserIcon className="w-6 h-6" />
                <span className="text-lg font-semibold">회원가입</span>
              </button>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">다양한 카테고리</h3>
              <p className="text-gray-600 text-sm">
                역사, 과학, 문화 등 다양한 주제의 퀴즈
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">난이도 선택</h3>
              <p className="text-gray-600 text-sm">
                초급부터 고급까지 실력에 맞게 선택
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">성적 추적</h3>
              <p className="text-gray-600 text-sm">
                내 퀴즈 기록과 통계를 확인하세요
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          © 2026 퀴즈 마스터. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
