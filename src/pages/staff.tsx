import staff from '../../public/data/staff.json';

export default function Staff() {
  return (
    <div className="page">
      <h1>Our Staff</h1>
      <div className="grid">
        {staff.map((member) => (
          <article key={member.id} className="card">
            <img src={member.photo} alt={member.name} />
            <h2>{member.name}</h2>
            <p>{member.role}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
