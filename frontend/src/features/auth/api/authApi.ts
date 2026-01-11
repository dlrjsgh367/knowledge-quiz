import client from '@/api/client';

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  email: string;
  username: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface LoginResponse extends AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  // 회원가입
  signup: (data: SignupRequest) =>
    client.post<AuthResponse>('/member/signup', data),

  // 로그인
  login: (data: LoginRequest) =>
    client.post<LoginResponse>('/auth/login', data),

  // 로그아웃
  logout: () =>
    client.post('/auth/logout'),

  // 현재 사용자 정보
  getCurrentUser: () =>
    client.get<AuthResponse>('/auth/me'),
};
