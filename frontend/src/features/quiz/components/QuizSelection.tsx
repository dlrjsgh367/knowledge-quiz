import { useState } from 'react';
import { Quiz, User } from '../App';
import { ArrowLeft, BookOpen, Brain, Globe, Beaker, Music, Film, Code } from 'lucide-react';

interface QuizSelectionProps {
  user: User | null;
  onQuizSelect: (quiz: Quiz) => void;
  onBack: () => void;
}

const categories = [
  { id: 'history', name: '역사', icon: BookOpen, color: 'bg-amber-500' },
  { id: 'science', name: '과학', icon: Beaker, color: 'bg-blue-500' },
  { id: 'geography', name: '지리', icon: Globe, color: 'bg-green-500' },
  { id: 'culture', name: '문화', icon: Music, color: 'bg-purple-500' },
  { id: 'entertainment', name: '엔터테인먼트', icon: Film, color: 'bg-pink-500' },
  { id: 'technology', name: '기술', icon: Code, color: 'bg-indigo-500' },
  { id: 'general', name: '일반상식', icon: Brain, color: 'bg-teal-500' },
];

// Mock quiz data
const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: '한국사 기초',
    category: 'history',
    difficulty: 'easy',
    questions: [
      {
        id: '1',
        question: '고려를 건국한 인물은?',
        options: ['왕건', '이성계', '박혁거세', '주몽'],
        correctAnswer: 0
      },
      {
        id: '2',
        question: '조선의 수도는?',
        options: ['경주', '개성', '한양', '평양'],
        correctAnswer: 2
      },
      {
        id: '3',
        question: '훈민정음을 창제한 왕은?',
        options: ['태종', '세종', '성종', '영조'],
        correctAnswer: 1
      },
      {
        id: '4',
        question: '임진왜란이 일어난 연도는?',
        options: ['1492년', '1592년', '1692년', '1792년'],
        correctAnswer: 1
      },
      {
        id: '5',
        question: '3.1 운동이 일어난 연도는?',
        options: ['1919년', '1920년', '1945년', '1950년'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: '2',
    title: '세계사 도전',
    category: 'history',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        question: '프랑스 혁명이 시작된 연도는?',
        options: ['1789년', '1799년', '1815년', '1848년'],
        correctAnswer: 0
      },
      {
        id: '2',
        question: '로마 제국의 초대 황제는?',
        options: ['율리우스 카이사르', '아우구스투스', '네로', '콘스탄티누스'],
        correctAnswer: 1
      },
      {
        id: '3',
        question: '제2차 세계대전이 끝난 연도는?',
        options: ['1943년', '1944년', '1945년', '1946년'],
        correctAnswer: 2
      },
      {
        id: '4',
        question: '베를린 장벽이 무너진 연도는?',
        options: ['1987년', '1989년', '1991년', '1993년'],
        correctAnswer: 1
      },
      {
        id: '5',
        question: '마젤란이 세계 일주를 완성한 세기는?',
        options: ['15세기', '16세기', '17세기', '18세기'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '3',
    title: '기초 과학',
    category: 'science',
    difficulty: 'easy',
    questions: [
      {
        id: '1',
        question: '물의 화학식은?',
        options: ['H2O', 'CO2', 'O2', 'H2'],
        correctAnswer: 0
      },
      {
        id: '2',
        question: '지구에서 가장 가까운 별은?',
        options: ['북극성', '시리우스', '태양', '알파 센타우리'],
        correctAnswer: 2
      },
      {
        id: '3',
        question: '광합성을 하는 식물의 부위는?',
        options: ['뿌리', '줄기', '잎', '꽃'],
        correctAnswer: 2
      },
      {
        id: '4',
        question: '소리의 속도는 약 얼마인가?',
        options: ['340m/s', '3,000m/s', '300,000km/s', '1,000m/s'],
        correctAnswer: 0
      },
      {
        id: '5',
        question: '인체에서 가장 큰 장기는?',
        options: ['심장', '폐', '간', '피부'],
        correctAnswer: 3
      }
    ]
  },
  {
    id: '4',
    title: '세계 지리',
    category: 'geography',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        question: '세계에서 가장 높은 산은?',
        options: ['K2', '에베레스트', '킬리만자로', '후지산'],
        correctAnswer: 1
      },
      {
        id: '2',
        question: '나일강이 흐르는 대륙은?',
        options: ['아시아', '유럽', '아프리카', '남아메리카'],
        correctAnswer: 2
      },
      {
        id: '3',
        question: '캐나다의 수도는?',
        options: ['토론토', '밴쿠버', '몬트리올', '오타와'],
        correctAnswer: 3
      },
      {
        id: '4',
        question: '사하라 사막이 위치한 곳은?',
        options: ['아시아', '아프리카', '오세아니아', '남아메리카'],
        correctAnswer: 1
      },
      {
        id: '5',
        question: '세계에서 가장 큰 섬은?',
        options: ['뉴기니', '보르네오', '그린란드', '마다가스카르'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '5',
    title: 'K-POP 퀴즈',
    category: 'entertainment',
    difficulty: 'easy',
    questions: [
      {
        id: '1',
        question: 'BTS의 데뷔곡은?',
        options: ['No More Dream', 'Boy In Luv', 'Danger', 'I Need U'],
        correctAnswer: 0
      },
      {
        id: '2',
        question: 'BLACKPINK의 멤버가 아닌 사람은?',
        options: ['지수', '제니', '로제', '아이린'],
        correctAnswer: 3
      },
      {
        id: '3',
        question: 'PSY의 대표곡은?',
        options: ['Fantastic Baby', 'Gangnam Style', 'Sorry Sorry', 'Gee'],
        correctAnswer: 1
      },
      {
        id: '4',
        question: 'EXO가 소속된 기획사는?',
        options: ['YG', 'JYP', 'SM', 'HYBE'],
        correctAnswer: 2
      },
      {
        id: '5',
        question: 'NewJeans의 데뷔 연도는?',
        options: ['2020년', '2021년', '2022년', '2023년'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '6',
    title: '프로그래밍 기초',
    category: 'technology',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        question: 'HTML의 정식 명칭은?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
        correctAnswer: 0
      },
      {
        id: '2',
        question: 'JavaScript를 만든 사람은?',
        options: ['팀 버너스 리', '브렌던 아이크', '귀도 반 로섬', '제임스 고슬링'],
        correctAnswer: 1
      },
      {
        id: '3',
        question: 'Git에서 변경사항을 저장하는 명령어는?',
        options: ['git push', 'git commit', 'git add', 'git save'],
        correctAnswer: 1
      },
      {
        id: '4',
        question: 'CSS에서 색상을 지정하는 방법이 아닌 것은?',
        options: ['RGB', 'HEX', 'HSL', 'XYZ'],
        correctAnswer: 3
      },
      {
        id: '5',
        question: 'React는 어느 회사에서 만들었나?',
        options: ['Google', 'Facebook', 'Microsoft', 'Apple'],
        correctAnswer: 1
      }
    ]
  },
];

export function QuizSelection({ user, onQuizSelect, onBack }: QuizSelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    const categoryMatch = selectedCategory === 'all' || quiz.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '초급';
      case 'medium': return '중급';
      case 'hard': return '고급';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">퀴즈 선택</h1>
          <p className="text-gray-600">원하는 카테고리와 난이도를 선택하세요</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">카테고리</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedCategory === 'all'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <Brain className={`w-6 h-6 mx-auto mb-2 ${selectedCategory === 'all' ? 'text-purple-600' : 'text-gray-400'}`} />
                <span className="text-sm font-medium">전체</span>
              </div>
            </button>
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="text-center">
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${selectedCategory === category.id ? 'text-purple-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">난이도</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedDifficulty === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-300'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedDifficulty('easy')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedDifficulty === 'easy'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-300'
              }`}
            >
              초급
            </button>
            <button
              onClick={() => setSelectedDifficulty('medium')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedDifficulty === 'medium'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-yellow-300'
              }`}
            >
              중급
            </button>
            <button
              onClick={() => setSelectedDifficulty('hard')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedDifficulty === 'hard'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-red-300'
              }`}
            >
              고급
            </button>
          </div>
        </div>

        {/* Quiz List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map(quiz => {
            const category = categories.find(c => c.id === quiz.category);
            const Icon = category?.icon || Brain;
            
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
                onClick={() => onQuizSelect(quiz)}
              >
                <div className={`${category?.color || 'bg-gray-500'} h-32 flex items-center justify-center`}>
                  <Icon className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {quiz.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                      {getDifficultyText(quiz.difficulty)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {category?.name || '일반'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{quiz.questions.length}개 문제</span>
                    <span className="text-purple-600 group-hover:underline">시작하기 →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">선택한 조건에 맞는 퀴즈가 없습니다</p>
          </div>
        )}
      </main>
    </div>
  );
}
