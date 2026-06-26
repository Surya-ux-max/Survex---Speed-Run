import React, { useState, useEffect } from 'react';
import { pricingConfig } from './pricingConfig';
import PricingCard from './PricingCard';
import Lightfall from '../Lightfall/Lightfall';

// Localize state to this component so changing options won't trigger re-renders of the App or outer headers
function PricingContainer() {
  const [currency, setCurrency] = useState('USD');
  const [billing, setBilling] = useState('monthly');
  const [isUpdating, setIsUpdating] = useState(false);

  // Trigger a brief updating animation to show dynamic computation in real time
  const handleCurrencyChange = (curr) => {
    if (curr === currency) return;
    setIsUpdating(true);
    setCurrency(curr);
  };

  const handleBillingChange = (bill) => {
    if (bill === billing) return;
    setIsUpdating(true);
    setBilling(bill);
  };

  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => setIsUpdating(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  return (
    <>
      {/* Control Panel / Toggles */}
      <div className="pricing-controls">
        {/* Currency selection */}
        <div>
          <div style={{ color: 'rgba(241, 246, 244, 0.4)', fontSize: '0.72rem', fontFamily: 'JetBrains Mono', marginBottom: '0.35rem' }}>
            SELECT_CURRENCY
          </div>
          <div className="pricing-toggle-group">
            {Object.keys(pricingConfig.currencies).map((curr) => (
              <React.Fragment key={curr}>
                <button
                  className={`pricing-toggle-btn ${currency === curr ? 'active' : ''}`}
                  onClick={() => handleCurrencyChange(curr)}
                >
                  {curr}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Billing cycle selection */}
        <div>
          <div style={{ color: 'rgba(241, 246, 244, 0.4)', fontSize: '0.72rem', fontFamily: 'JetBrains Mono', marginBottom: '0.35rem' }}>
            BILLING_CYCLE
          </div>
          <div className="pricing-toggle-group">
            <button
              className={`pricing-toggle-btn ${billing === 'monthly' ? 'active' : ''}`}
              onClick={() => handleBillingChange('monthly')}
            >
              MONTHLY
            </button>
            <div className="pricing-toggle-sep" />
            <button
              className={`pricing-toggle-btn ${billing === 'annual' ? 'active' : ''}`}
              onClick={() => handleBillingChange('annual')}
            >
              ANNUAL
            </button>
          </div>
        </div>

        {/* Promo badge */}
        {billing === 'annual' && (
          <div style={{ marginTop: '1.25rem' }}>
            <span className="pricing-badge">Save 20%</span>
          </div>
        )}
      </div>

      {/* Pricing Cards Grid */}
      <div className="pricing-grid">
        {pricingConfig.plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            currency={currency}
            billing={billing}
            isUpdating={isUpdating}
          />
        ))}
      </div>
    </>
  );
}

export default function Pricing() {
  return (
    <section className="pricing-section" id="pricing" aria-label="Product Pricing" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Lightfall background shader effect */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15, pointerEvents: 'none' }}>
        <Lightfall
          colors={['#FFC801', '#FF9932', '#F1F6F4']}
          backgroundColor="#114C5A"
          speed={0.4}
          streakCount={5}
          streakWidth={1}
          streakLength={1.2}
          glow={1}
          density={0.5}
          twinkle={0.8}
          zoom={2.5}
          backgroundGlow={0.4}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.6}
          mouseRadius={0.8}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label">Config parameters</div>
        <h2 className="section-title">Transparent pricing for engineering teams</h2>
        <p className="section-subtitle">
          Prices recalculate dynamically based on your currency, regional parameters, and billing cycle.
        </p>

        <PricingContainer />
      </div>
    </section>
  );
}

