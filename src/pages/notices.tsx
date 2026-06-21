import notices from '../../public/data/notices.json';

export default function Notices() {
  return (
    <div className="page">
      <h1>Notices</h1>
      <ul className="list">
        {notices.map((notice) => (
          <li key={notice.id} className="card">
            <h2>{notice.title}</h2>
            <p>{notice.description}</p>
            <p className="muted">{notice.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
