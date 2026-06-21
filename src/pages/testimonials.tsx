import testimonials from '../../public/data/testimonials.json';

export default function Testimonials() {
  return (
    <div className="page">
      <h1>Testimonials</h1>
      <p>Hear from our students, parents, and community members.</p>
      <div className="grid">
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className="card">
            <p>{testimonial.message}</p>
            <p className="muted">— {testimonial.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
