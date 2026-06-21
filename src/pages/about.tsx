import homeData from '../../public/data/home.json';

export default function About() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Our History</p>
        <h1>{homeData.about.title}</h1>
        <p className="hero-description">Learn about our journey, leadership, mission, and the values that guide every student at Quaid-e-Millat Public School.</p>
      </header>

      <section className="section history-grid">
        {homeData.about.sections.map((section, index) => (
          <article key={section.heading} className={`history-card ${index % 2 === 0 ? 'history-card-left' : 'history-card-right'}`}>
            <h2>{section.heading}</h2>
            {section.subheading && <h3>{section.subheading}</h3>}
            <p>{section.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
