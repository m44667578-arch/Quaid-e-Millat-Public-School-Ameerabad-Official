'use client';

import { FormEvent, useState } from 'react';
import AuthGuard from '../../components/AuthGuard';
import results from '../../../public/data/results.json';
import notices from '../../../public/data/notices.json';
import events from '../../../public/data/events.json';
import gallery from '../../../public/data/gallery.json';

export default function StudentDashboard() {
  const [roll, setRoll] = useState('');
  const [dob, setDob] = useState('');
  const [record, setRecord] = useState<any | null>(null);
  const [message, setMessage] = useState('Enter your roll number and date of birth.');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = results.find((item) => item.rollNo === roll && item.dob === dob);
    if (!found) {
      setRecord(null);
      setMessage('No student record found.');
      return;
    }
    setRecord(found);
    setMessage('');
  };

  return (
    <AuthGuard allowedRoles={['student']}>
      <div className="page">
        <h1>Student Dashboard</h1>
        <p>View your profile, results, notices, events, and gallery highlights.</p>
        <form onSubmit={handleSearch} className="search-form">
          <label>
            Roll Number
            <input value={roll} onChange={(e) => setRoll(e.target.value)} required />
          </label>
          <label>
            Date of Birth
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </label>
          <button type="submit">Search</button>
        </form>
        {message && <p>{message}</p>}
        {record && (
          <div className="card">
            <h2>{record.name}</h2>
            <p>Class: {record.class}</p>
            <p>Roll Number: {record.rollNo}</p>
            <p>Percentage: {record.percentage}%</p>
            <p>Grade: {record.grade}</p>
            <section className="section">
              <h3>Notices</h3>
              <ul>
                {notices.slice(0, 3).map((notice) => (
                  <li key={notice.id}>{notice.title}</li>
                ))}
              </ul>
            </section>
            <section className="section">
              <h3>Upcoming Events</h3>
              <ul>
                {events.slice(0, 3).map((event) => (
                  <li key={event.id}>{event.name}</li>
                ))}
              </ul>
            </section>
            <section className="section">
              <h3>Gallery Highlights</h3>
              <div className="gallery-grid">
                {gallery.slice(0, 3).map((item) => (
                  <img key={item.id} src={item.image} alt={item.title} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
