import { useState } from 'react';
import { User } from '../App';
import { ArrowLeft, Mail, Lock, UserIcon } from 'lucide-react';
import { authApi } from '../api/authApi';
import { useAuth } from '@/shared/contexts/AuthContext';

interface AuthProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export function Auth({ onLogin, onBack }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // 로그인 로직
        if (!email || !password) {
          setError('모든 필드를 입력해주세요');
          return;
        }

        const response = await authApi.login({ email, password });
        const { accessToken, ...userData } = response.data;

        // Context에 사용자 정보 저장
        authLogin(accessToken, userData);

        // 부모 컴포넌트에 알림
        const user: User = {
          id: userData.id.toString(),
          username: userData.username,
          email: userData.email,
        };
        onLogin(user);
      } else {
        // 회원가입 로직
        if (!email || !password || !username) {
          setError('모든 필드를 입력해주세요');
          return;
        }

        if (password.length < 6) {
          setError('비밀번호는 6자 이상이어야 합니다');
          return;
        }

        // 회원가입 API 호출
        const signupResponse = await authApi.signup({
          email,
          password,
          username,
        });

        // 회원가입 성공 후 자동 로그인
        const loginResponse = await authApi.login({ email, password });
        const { accessToken, ...userData } = loginResponse.data;

        // Context에 사용자 정보 저장
        authLogin(accessToken, userData);

        // 부모 컴포넌트에 알림
        const user: User = {
          id: userData.id.toString(),
          username: userData.username,
          email: userData.email,
        };
        onLogin(user);
      }
    } catch (err: any) {
      // 에러 처리
      const errorMessage = err.response?.data?.message || err.message || '요청 중 오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>돌아가기</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <UserIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? '로그인' : '회원가입'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? '계정에 로그인하세요' : '새 계정을 만드세요'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  사용자 이름
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="닉네임을 입력하세요"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="이메일을 입력하세요"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  처리 중...
                </span>
              ) : (
                isLogin ? '로그인' : '회원가입'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
