export type AuthRole = 'principal' | 'student' | 'teacher' | 'staff' | 'parent';

export type AuthUser = {
  id: string;
  role: AuthRole;
  username: string;
  password: string;
  name: string;
  class?: string;
  code?: string;
};

const AUTH_STORAGE_KEY = 'qmps_auth_user';

export async function fetchUsers(): Promise<AuthUser[]> {
  const response = await fetch('/data/users.json');
  if (!response.ok) {
    throw new Error('Unable to load user credentials.');
  }
  return response.json();
}

export async function loginUser(username: string, password: string): Promise<AuthUser | null> {
  const users = await fetchUsers();
  return users.find((user) => user.username === username && user.password === password) ?? null;
}

export function storeUser(user: AuthUser) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
  return stored ? (JSON.parse(stored) as AuthUser) : null;
}

export function logoutUser() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getCurrentUser());
}
