import { FormEvent, useState } from 'react';
import results from '../../public/data/results.json';

export default function Results() {
  const [roll, setRoll] = useState('');
  const [dob, setDob] = useState('');
  const [record, setRecord] = useState<any>(null);
  const [message, setMessage] = useState('');

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = results.find((r) => r.rollNo === roll && r.dob === dob);
    if (found) {
      setRecord(found);
      setMessage('');
    } else {
      setRecord(null);
      setMessage('No result found.');
    }
  };

  return (
    <div className="page">
      <h1>Student Result Search</h1>
      <form onSubmit={search} className="search-form">
        <label>
          Roll Number
          <input value={roll} onChange={(e) => setRoll(e.target.value)} />
        </label>
        <label>
          Date of Birth
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>}
      {record && (
        <div className="result-card">
          <h2>{record.name}</h2>
          <p>Class: {record.class}</p>
          <p>Percentage: {record.percentage}%</p>
          <p>Grade: {record.grade}</p>
        </div>
      )}
    </div>
  );
}
