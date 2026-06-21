'use client';

import { FormEvent, useEffect, useState } from 'react';
import { fetchGitHubFile, updateGitHubFile } from '../../lib/githubClient';
import { getCurrentUser } from '../../lib/auth';
import { useRouter } from 'next/router';

type UserRecord = {
  id: string;
  role: string;
  username: string;
  password: string;
  name: string;
  class?: string;
  code?: string;
};

export default function ManageAccounts() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState<UserRecord>({
    id: '',
    role: 'student',
    username: '',
    password: '',
    name: '',
    class: '',
    code: '',
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'principal') {
      router.replace('/login');
    }
  }, [router]);

  const loadAccounts = async () => {
    setLoading(true);
    setError('');
    setStatus('Loading account list...');

    try {
      const result = await fetchGitHubFile({
        owner: 'm44667578-arch',
        repo: 'Quaid-e-Millat-Public-School-Ameerabad-Official',
        path: 'public/data/users.json',
      });
      setAccounts(Array.isArray(result.data) ? result.data : []);
      setStatus('Accounts loaded.');
    } catch (err) {
      setError((err as Error).message);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newAccount.username || !newAccount.password || !newAccount.name) {
      setError('Username, password, and name are required.');
      return;
    }

    setLoading(true);
    setError('');
    setStatus('Saving account...');

    try {
      const id = `${newAccount.role}-${Date.now()}`;
      const updated = [...accounts, { ...newAccount, id }];
      await updateGitHubFile({
        owner: 'm44667578-arch',
        repo: 'Quaid-e-Millat-Public-School-Ameerabad-Official',
        path: 'public/data/users.json',
        data: updated,
        message: `Add ${newAccount.role} account ${newAccount.username}`,
      });
      setAccounts(updated);
      setStatus('Account saved successfully.');
      setNewAccount({ id: '', role: 'student', username: '', password: '', name: '', class: '', code: '' });
    } catch (err) {
      setError((err as Error).message);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this account?')) return;
    setLoading(true);
    setError('');
    setStatus('Deleting account...');

    try {
      const updated = accounts.filter((item) => item.id !== id);
      await updateGitHubFile({
        owner: 'm44667578-arch',
        repo: 'Quaid-e-Millat-Public-School-Ameerabad-Official',
        path: 'public/data/users.json',
        data: updated,
        message: 'Delete user account',
      });
      setAccounts(updated);
      setStatus('Account deleted.');
    } catch (err) {
      setError((err as Error).message);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Manage User Accounts</h1>
      <p>Create student, teacher, staff, and parent login credentials.</p>

      <section className="card">
        <button type="button" className="button primary" disabled={loading} onClick={loadAccounts}>
          Load Accounts
        </button>
        {status && <p className="status">{status}</p>}
        {error && <p className="error">{error}</p>}
      </section>

      <section className="card">
        <h2>Add new account</h2>
        <form onSubmit={handleSave} className="grid">
          <label>
            Role
            <select value={newAccount.role} onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value })}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="staff">Staff</option>
              <option value="parent">Parent</option>
            </select>
          </label>

          <label>
            Username
            <input value={newAccount.username} onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })} required />
          </label>

          <label>
            Password
            <input type="password" value={newAccount.password} onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })} required />
          </label>

          <label>
            Name
            <input value={newAccount.name} onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })} required />
          </label>

          {newAccount.role === 'student' && (
            <label>
              Class
              <input value={newAccount.class} onChange={(e) => setNewAccount({ ...newAccount, class: e.target.value })} />
            </label>
          )}

          {(newAccount.role === 'teacher' || newAccount.role === 'staff') && (
            <label>
              Code
              <input value={newAccount.code} onChange={(e) => setNewAccount({ ...newAccount, code: e.target.value })} />
            </label>
          )}

          <button type="submit" className="button primary" disabled={loading}>Save Account</button>
        </form>
      </section>

      <section className="card">
        <h2>Existing accounts</h2>
        {accounts.length === 0 ? (
          <p>No accounts loaded. Click Load Accounts above.</p>
        ) : (
          <ul className="list">
            {accounts.map((account) => (
              <li key={account.id} className="card">
                <strong>{account.username}</strong> — {account.role}
                <div className="item-actions">
                  <button type="button" className="button danger" disabled={loading} onClick={() => handleDelete(account.id)}>
                    Delete
                  </button>
                </div>
                <pre>{JSON.stringify(account, null, 2)}</pre>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
