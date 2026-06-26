import React from 'react';

const testimonials = [
  {
    quote: "DataFlux solved our schema drift headaches overnight. Being able to declare schema expectations at the ingress and automatically route failures to our Dead-Letter Queue saved our analytics pipeline from breaking repeatedly.",
    author: "Elena Rostova",
    role: "Lead Data Engineer, ScaleOps",
    initials: "ER"
  },
  {
    quote: "The retry scheduler's built-in exponential backoff and jitter stopped our API endpoints from being overwhelmed when recovering from database outages. Outstanding developer experience.",
    author: "Marcus Vance",
    role: "VP of Infrastructure, CloudFlow",
    initials: "MV"
  },
  {
    quote: "With DataFlux, we mask PII at the boundary before it hits our warehouses. Compliance audits are now trivial because compliance policy is enforced directly within the pipeline configuration.",
    author: "Siddharth Mehta",
    role: "Chief Security Officer, FinRoute",
    initials: "SM"
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials" aria-label="Customer Testimonials">
      <div className="container">
        <div className="section-label">PROVEN IN PRODUCTION</div>
        <h2 className="section-title">Endorsed by data ops pioneers</h2>
        <p className="section-subtitle">
          See how leading technical teams maintain pipeline resilience and schema safety.
        </p>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <article key={idx} className="testimonial-card">
              <span className="testimonial-quote-mark" aria-hidden="true">“</span>
              <p className="testimonial-body">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <h3 className="testimonial-name">{t.author}</h3>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
