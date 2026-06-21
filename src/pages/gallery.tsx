import { useMemo, useState } from 'react';
import galleryData from '../../public/data/gallery.json';

type GalleryItem = {
  id: string;
  title: string;
  image?: string;
  video?: string;
  category?: string;
};

const categories = ['All', 'Events', 'Sports', 'Academics', 'Culture'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () => galleryData.filter((item) => filter === 'All' || item.category === filter),
    [filter]
  );

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Gallery</p>
          <h1>School Moments and Video Highlights</h1>
          <p className="hero-description">Explore our gallery with photos, event videos, and filtered collections for a brighter school experience.</p>
        </div>
      </header>

      <section className="gallery-controls">
        <p>Filter by category:</p>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-button ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <div className="grid gallery-grid">
        {filtered.map((item: GalleryItem) => (
          <article key={item.id} className="gallery-item">
            <div className="gallery-media">
              {item.video ? (
                <video controls poster={item.image}>
                  <source src={item.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={item.image} alt={item.title} />
              )}
            </div>
            <h2>{item.title}</h2>
            {item.category && <div className="gallery-meta">Category: {item.category}</div>}
          </article>
        ))}
      </div>
    </div>
  );
}
