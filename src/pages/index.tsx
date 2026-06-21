import Link from 'next/link';
import data from '../../public/data/home.json';

export default function Home() {
  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">{data.hero.subtitle}</p>
          <h1>{data.hero.title}</h1>
          <p className="hero-description">{data.hero.description}</p>
          <div className="buttons">
            <Link href="/contact" className="button primary">Admissions Open</Link>
            <Link href="/results" className="button secondary">View Results</Link>
          </div>
        </div>
      </header>

      <section className="section stats">
        {data.statistics.map((item) => (
          <article key={item.label} className="stat-card">
            <p className="stat-value">{item.value}</p>
            <p className="stat-label">{item.label}</p>
          </article>
        ))}
      </section>

      <section className="section two-column-section">
        <div className="feature-block">
          <h2>Featured Events</h2>
          <p className="section-text">See upcoming activities, school celebrations, and community programs that keep our students engaged.</p>
          <div className="info-list">
            {data.events.map((event) => (
              <div key={event.id} className="info-item">
                <p className="info-title">{event.name}</p>
                <p className="info-detail">{event.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-block accent-block">
          <h2>Latest Notices</h2>
          <p className="section-text">Important school announcements are shared here so parents and students never miss an update.</p>
          <div className="info-list">
            {data.notices.map((notice) => (
              <div key={notice.id} className="info-item notice-item">
                <p className="info-title">{notice.title}</p>
                <p className="info-detail">{notice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
