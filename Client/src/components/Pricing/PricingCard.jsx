import React, { useMemo } from 'react';
import { pricingConfig } from './pricingConfig';

// Memoized features list to prevent re-renders when billing or currency toggles
const StaticPlanDetails = React.memo(({ name, features }) => {
  return (
    <>
      <h3 className="pricing-plan-name">{name}</h3>
      <div className="pricing-divider" />
      <ul className="pricing-features-list">
        {features.map((feat, idx) => (
          <li key={idx} className="pricing-feature-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pricing-feature-check"
            >
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </>
  );
});

StaticPlanDetails.displayName = 'StaticPlanDetails';

// Dedicated pricing value component to isolate update animation
const DynamicPriceValue = React.memo(({ plan, currency, billing, isUpdating }) => {
  const priceData = useMemo(() => {
    const currData = pricingConfig.currencies[currency];
    const billData = pricingConfig.billing[billing];
    const finalPrice = Math.round(
      plan.baseUSD * currData.multiplier * currData.tariff * billData.modifier
    );
    return {
      symbol: currData.symbol,
      amount: finalPrice,
      period: billing === 'annual' ? '/yr billed annually' : '/mo'
    };
  }, [plan.baseUSD, currency, billing]);

  return (
    <div className="pricing-value-row">
      <span className="pricing-symbol">{priceData.symbol}</span>
      <span className={`pricing-amount ${isUpdating ? 'updating' : ''}`}>
        {priceData.amount.toLocaleString()}
      </span>
      <span className="pricing-period">{priceData.period}</span>
    </div>
  );
});

DynamicPriceValue.displayName = 'DynamicPriceValue';

export default React.memo(function PricingCard({ plan, currency, billing, isUpdating }) {
  const isFeatured = plan.id === 'PLAN_PRO';

  return (
    <article className={`pricing-card ${isFeatured ? 'featured' : ''}`}>
      {/* macOS Terminal style titlebar */}
      <div className="pricing-card-terminal-bar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-filename">~/dataflux/plans/{plan.id.toLowerCase()}.conf</span>
      </div>

      <div className="pricing-card-body">
        <div className="pricing-plan-id">{plan.id}</div>

        {/* Dynamic terminal REPL command output */}
        <div className="pricing-terminal-cmd" aria-hidden="true">
          <span className="cmd-prompt">$</span> ./calculate <span className="cmd-flag">--plan</span>=<span className="cmd-value">{plan.id.split('_')[1].toLowerCase()}</span> <span className="cmd-flag">--currency</span>=<span className="cmd-value">{currency}</span> <span className="cmd-flag">--billing</span>=<span className="cmd-value">{billing}</span>
        </div>

        {/* Dynamic price display */}
        <DynamicPriceValue plan={plan} currency={currency} billing={billing} isUpdating={isUpdating} />

        {/* Static content, memoized to prevent re-renders when price updates */}
        <StaticPlanDetails name={plan.name} features={plan.features} />

        <button className={`btn pricing-card-cta ${isFeatured ? 'btn-primary' : 'btn-secondary'}`}>
          Deploy {plan.id.split('_')[1]}
        </button>
      </div>
    </article>
  );
});
