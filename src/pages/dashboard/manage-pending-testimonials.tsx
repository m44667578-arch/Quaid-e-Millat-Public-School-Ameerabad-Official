'use client';

import { useEffect, useState } from 'react';
import { fetchGitHubFile, updateGitHubFile } from '../../lib/githubClient';

export default function ManagePendingTestimonials() {
  const [owner, setOwner] = useState('m44667578-arch');
  const [repo, setRepo] = useState('Quaid-e-Millat-Public-School-Ameerabad-Official');
  const [branch, setBranch] = useState('main');
  const [pending, setPending] = useState<any[]>([]);
  const [approved, setApproved] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const loadFiles = async () => {
    setLoading(true);
    setError('');
    setStatus('Loading pending testimonials...');

    try {
      const [pendingFile, approvedFile] = await Promise.all([
        fetchGitHubFile({ owner, repo, path: 'public/data/pending-testimonials.json', branch }),
        fetchGitHubFile({ owner, repo, path: 'public/data/testimonials.json', branch }),
      ]);
      setPending(Array.isArray(pendingFile.data) ? pendingFile.data : []);
      setApproved(Array.isArray(approvedFile.data) ? approvedFile.data : []);
      setStatus('Loaded pending testimonials.');
    } catch (err) {
      setError((err as Error).message);
      setStatus('');
      setPending([]);
      setApproved([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (item: any) => {
    setLoading(true);
    setError('');
    setStatus('Approving testimonial...');

    try {
      const updatedPending = pending.filter((entry) => entry.id !== item.id);
      const updatedApproved = [...approved, item];
      await updateGitHubFile({
        owner,
        repo,
        path: 'public/data/pending-testimonials.json',
        branch,
        data: updatedPending,
        message: 'Approve testimonial',
      });
      await updateGitHubFile({
        owner,
        repo,
        path: 'public/data/testimonials.json',
        branch,
        data: updatedApproved,
        message: 'Add approved testimonial',
      });
      setPending(updatedPending);
      setApproved(updatedApproved);
      setStatus('Testimonial approved.');
    } catch (err) {
      setError((err as Error).message);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (itemId: string) => {
    if (!confirm('Reject this testimonial?')) return;
    setLoading(true);
    setError('');
    setStatus('Rejecting testimonial...');

    try {
      const updatedPending = pending.filter((entry) => entry.id !== itemId);
      await updateGitHubFile({
        owner,
        repo,
        path: 'public/data/pending-testimonials.json',
        branch,
        data: updatedPending,
        message: 'Reject testimonial',
      });
      setPending(updatedPending);
      setStatus('Testimonial rejected.');
    } catch (err) {
      setError((err as Error).message);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError('');
    setStatus('');
  }, [owner, repo, branch]);

  return (
    <div className="page">
      <h1>Manage Pending Testimonials</h1>
      <p>Approve or reject visitor testimonials and publish them to the live website.</p>

      <section className="card">
        <h2>GitHub settings</h2>
        <div className="grid">
          <label>
            Owner
            <input value={owner} onChange={(e) => setOwner(e.target.value)} />
          </label>
          <label>
            Repository
            <input value={repo} onChange={(e) => setRepo(e.target.value)} />
          </label>
          <label>
            Branch
            <input value={branch} onChange={(e) => setBranch(e.target.value)} />
          </label>
        </div>
        <p className="hint">Uses the server-side GitHub token configured via environment variables.</p>
        <button disabled={loading} onClick={loadFiles}>Load pending testimonials</button>
      </section>

      {status && <p className="status">{status}</p>}
      {error && <p className="error">{error}</p>}

      <section className="card">
        <h2>Pending Testimonials</h2>
        {pending.length === 0 ? (
          <p>No pending testimonials loaded.</p>
        ) : (
          <ul className="list">
            {pending.map((item) => (
              <li key={item.id} className="card">
                <strong>{item.name}</strong>
                <p>{item.message}</p>
                <div className="item-actions">
                  <button type="button" className="button" onClick={() => handleApprove(item)}>Approve</button>
                  <button type="button" className="button danger" onClick={() => handleReject(item.id)}>Reject</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
