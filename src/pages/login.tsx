'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser, storeUser } from '../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await loginUser(username.trim(), password.trim());
      if (!user) {
        setError('Invalid username or password.');
        return;
      }

      storeUser(user);
      if (user.role === 'principal') {
        router.push('/dashboard/principal');
      } else if (user.role === 'student') {
        router.push('/dashboard/student');
      } else if (user.role === 'teacher' || user.role === 'staff') {
        router.push('/dashboard/teacher');
      } else if (user.role === 'parent') {
        router.push('/dashboard/parent');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>
      <p>Enter your username and password to access the correct dashboard.</p>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Checking...' : 'Login'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="login-note">
        <p>Principal login:
          <strong>Principal QMPS</strong> / <strong>QMPS512&786</strong>
        </p>
      </div>
    </div>
  );
}
