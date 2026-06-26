import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';

// Lazy load the 3D scene so it does not block the initial paint/TTI
const PipelineScene = lazy(() => import('./PipelineScene'));

export default function Hero() {
  const [count, setCount] = useState(1204000);
  const countRef = useRef(1204000);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2500; // 2.5 seconds count animation
    const startValue = 1204000;
    const endValue = 1204887;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * (endValue - startValue) + startValue);
      countRef.current = currentValue;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        const interval = setInterval(() => {
          const increment = Math.floor(Math.random() * 5) + 1;
          countRef.current += increment;
          setCount(countRef.current);
        }, 3000);
        return () => clearInterval(interval);
      }
    };

    const animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const formatCount = (num) => {
    return num.toLocaleString('en-US');
  };

  return (
    <section className="hero grid-overlay" aria-label="Hero Section" id="pipeline" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Full-bleed interactive 3D scene covering the entire Hero background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Suspense fallback={null}>
          <PipelineScene />
        </Suspense>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        {/* Content container - left aligned, pointerEvents auto so links and buttons are clickable */}
        <div className="animate-fade-up" style={{ maxWidth: '620px', pointerEvents: 'auto' }}>
          <div className="hero-tag">
            Active Conduit: Node-109
          </div>
          <h1 className="hero-headline">
            Automate pipelines. <br />
            <em>Validate in flight.</em>
          </h1>
          <p className="hero-subheadline">
            DataFlux orchestrates ingestion, validation, and real-time delivery with zero-trust schema enforcement. Direct failed records to dead-letter queues instantly.
          </p>

          <div className="hero-counter-wrap">
            <div className="hero-counter-label">Telemetry Live Stream</div>
            <div className="hero-counter" aria-live="polite">
              {formatCount(count)}
              <span className="hero-counter-unit">records routed today</span>
            </div>
          </div>

          <div className="hero-ctas">
            <a href="#pricing" className="btn btn-primary">
              Build Pipeline
            </a>
            <a href="#features" className="btn btn-secondary">
              View Specs
            </a>
          </div>

          {/* Pipeline flow tags */}
          <div className="pipeline-stages" aria-label="Pipeline workflow stages">
            <span className="pipeline-stage active">Ingest</span>
            <span className="pipeline-stage active">Transform</span>
            <span className="pipeline-stage active">Validate</span>
            <span className="pipeline-stage active">Deliver</span>
          </div>
        </div>
      </div>
    </section>
  );
}
