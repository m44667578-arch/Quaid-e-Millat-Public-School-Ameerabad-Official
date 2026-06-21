'use client';

import { FormEvent, useState } from 'react';
import { updateGitHubFile, fetchGitHubFile } from '../lib/githubClient';

export default function SubmitTestimonial() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setStatus('Submitting testimonial...');

    try {
      const file = await fetchGitHubFile({
        owner: 'm44667578-arch',
        repo: 'Quaid-e-Millat-Public-School-Ameerabad-Official',
        path: 'public/data/pending-testimonials.json',
      });
      const pending = Array.isArray(file.data) ? file.data : [];
      const item = {
        id: `pending-${Date.now()}`,
        name,
        message,
        date: new Date().toISOString(),
      };
      const updated = [...pending, item];
      await updateGitHubFile({
        owner: 'm44667578-arch',
        repo: 'Quaid-e-Millat-Public-School-Ameerabad-Official',
        path: 'public/data/pending-testimonials.json',
        data: updated,
        message: 'Add pending testimonial',
      });
      setStatus('Testimonial submitted and pending approval.');
      setName('');
      setMessage('');
    } catch (err) {
      setError((err as Error).message);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Submit a Testimonial</h1>
      <p>Share your experience and the principal can approve it for publication.</p>
      <form onSubmit={handleSubmit} className="search-form">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Message
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} />
        </label>
        <button type="submit" disabled={loading}>Submit Testimonial</button>
      </form>
      {status && <p className="status">{status}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
