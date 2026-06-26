import React from 'react';
import { useActiveFeature } from '../../hooks/useActiveFeature';

const features = [
  {
    id: 'orchestration',
    title: 'Orchestration Engine',
    tag: 'Pipeline Core',
    desc: 'Define complex DAGs, parallel fan-outs, and linear pipelines. Schedule and trigger workflows via Webhooks, CRON, or event sources with microsecond latency.',
    sizeClass: 'bento-card--xl',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-icon">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    id: 'validator',
    title: 'Schema Validator',
    tag: 'Data Quality',
    desc: 'Verify incoming payloads against custom JSON Schema, Protobuf, or Avro specs. Reject or sanitize non-compliant fields before they reach downstream databases.',
    sizeClass: 'bento-card--lg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-icon">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 11 2 2 4-4"/>
      </svg>
    )
  },
  {
    id: 'dlq',
    title: 'Dead-Letter Queue',
    tag: 'Fault Tolerance',
    desc: 'Isolate corrupted payloads automatically. Route failed records to an isolated DLQ for inspection, manual correction, and safe replay without stalling the pipeline.',
    sizeClass: 'bento-card--md',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-icon">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
      </svg>
    )
  },
  {
    id: 'retry',
    title: 'Retry Scheduler',
    tag: 'Self-Healing',
    desc: 'Configure exponential backoff and jittered retry strategies for flaky HTTP endpoints or unstable databases. Avoid thundering herd problems automatically.',
    sizeClass: 'bento-card--md',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-icon">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
      </svg>
    )
  },
  {
    id: 'metrics',
    title: 'Metric Exporter',
    tag: 'Telemetry',
    desc: 'Export high-fidelity pipeline metrics to Prometheus or Datadog. Monitor throughput, latency, and error rates in real-time.',
    sizeClass: 'bento-card--sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-icon">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    )
  },
  {
    id: 'debugger',
    title: 'Pipeline Debugger',
    tag: 'Diagnostics',
    desc: 'Step through execution history, inspect variable bindings, test schemas live, and trace individual packets through the routing graph.',
    sizeClass: 'bento-card--sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-icon">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  {
    id: 'compliance',
    title: 'Compliance Guard',
    tag: 'Security',
    desc: 'Anonymize PII data automatically with dynamic masking. Ensure compliance with HIPAA and GDPR regulations at the ingestion boundary.',
    sizeClass: 'bento-card--sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-icon">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    )
  }
];

export default function BentoGrid() {
  const { activeFeature, toggleFeature } = useActiveFeature('orchestration');

  return (
    <section className="features-section" id="features" aria-label="Key Features">
      <div className="container">
        <div className="section-label">Capabilities Spec</div>
        <h2 className="section-title">Engineered for absolute pipeline integrity</h2>
        <p className="section-subtitle">
          DataFlux automates structural pipeline concerns so you can focus on writing transformation logic.
        </p>

        {/* Desktop Bento Grid (hidden on mobile via CSS) */}
        <div className="bento-grid" role="tablist" aria-label="Feature Tabs">
          {features.map((feat) => (
            <div
              key={feat.id}
              className={`bento-card ${feat.sizeClass}`}
              onClick={() => toggleFeature(feat.id)}
              role="tab"
              aria-selected={activeFeature === feat.id}
              aria-controls={`panel-${feat.id}`}
              id={`tab-${feat.id}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFeature(feat.id);
                }
              }}
            >
              <div className={`bento-card-inner ${activeFeature === feat.id ? 'active' : ''}`}>
                <div className="bento-card-tag">{feat.tag}</div>
                {feat.icon}
                <h3 className="bento-card-title">{feat.title}</h3>
                <p className="bento-card-desc">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Accordion (hidden on desktop via CSS) */}
        <div className="accordion" aria-label="Feature Accordions">
          {features.map((feat) => {
            const isActive = activeFeature === feat.id;
            return (
              <div key={feat.id} className="accordion-item">
                <button
                  className={`accordion-trigger ${isActive ? 'active' : ''}`}
                  onClick={() => toggleFeature(feat.id)}
                  aria-expanded={isActive}
                  aria-controls={`panel-mobile-${feat.id}`}
                  id={`tab-mobile-${feat.id}`}
                >
                  <div className="accordion-trigger-left">
                    <div className="accordion-icon-wrap">
                      {React.cloneElement(feat.icon, { className: 'accordion-svg', width: 18, height: 18 })}
                    </div>
                    <span className="accordion-trigger-title">{feat.title}</span>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="accordion-chevron"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                <div
                  id={`panel-mobile-${feat.id}`}
                  className={`accordion-body ${isActive ? 'open' : ''}`}
                  role="region"
                  aria-labelledby={`tab-mobile-${feat.id}`}
                  style={{ maxHeight: isActive ? '200px' : '0px' }}
                >
                  <div className="accordion-body-inner">
                    <div className="bento-card-tag" style={{ marginBottom: '0.5rem', fontSize: '0.75rem' }}>{feat.tag}</div>
                    {feat.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
