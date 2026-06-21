import events from '../../public/data/events.json';

export default function Events() {
  return (
    <div className="page">
      <h1>Events</h1>
      <ul className="list">
        {events.map((event) => (
          <li key={event.id} className="card">
            <h2>{event.name}</h2>
            <p>{event.date}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
