'use client';

import AuthGuard from '../../components/AuthGuard';
import notices from '../../../public/data/notices.json';
import events from '../../../public/data/events.json';
import results from '../../../public/data/results.json';

export default function ParentDashboard() {
  return (
    <AuthGuard allowedRoles={['parent']}>
      <div className="page">
        <h1>Parent Dashboard</h1>
        <p>View your child&apos;s profile, notices, events, and results from one page.</p>
        <section className="card">
          <h2>Child Results</h2>
          <ul className="list">
            {results.slice(0, 3).map((item) => (
              <li key={item.rollNo}>
                <strong>{item.name}</strong> — Class {item.class}
              </li>
            ))}
          </ul>
        </section>
        <section className="card">
          <h2>Latest Notices</h2>
          <ul className="list">
            {notices.slice(0, 3).map((notice) => (
              <li key={notice.id}>{notice.title}</li>
            ))}
          </ul>
        </section>
        <section className="card">
          <h2>Upcoming Events</h2>
          <ul className="list">
            {events.slice(0, 3).map((event) => (
              <li key={event.id}>{event.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </AuthGuard>
  );
}
