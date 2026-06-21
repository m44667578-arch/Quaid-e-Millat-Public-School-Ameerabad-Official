'use client';

import { useState } from 'react';
import AuthGuard from '../../components/AuthGuard';
import results from '../../../public/data/results.json';
import notices from '../../../public/data/notices.json';
import events from '../../../public/data/events.json';

export default function TeacherDashboard() {
  const [role] = useState('Teacher');

  return (
    <AuthGuard allowedRoles={['teacher', 'staff']}>
      <div className="page">
        <h1>Teacher Dashboard</h1>
        <p>View students, upload marks, and manage notices or events.</p>
        <section className="card">
          <h2>{role} Tools</h2>
          <ul>
            <li>View student results and profile data</li>
            <li>Upload marks via GitHub resource manager</li>
            <li>Add notice or event entries</li>
          </ul>
        </section>
        <section className="card">
          <h2>Recent Student Records</h2>
          <ul className="list">
            {results.slice(0, 3).map((item) => (
              <li key={item.rollNo}>
                <strong>{item.rollNo}</strong> — {item.name} ({item.class})
              </li>
            ))}
          </ul>
        </section>
        <section className="card">
          <h2>Notices and Events</h2>
          <ul className="list">
            {notices.slice(0, 2).map((notice) => (
              <li key={notice.id}>{notice.title}</li>
            ))}
            {events.slice(0, 2).map((event) => (
              <li key={event.id}>{event.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </AuthGuard>
  );
}
