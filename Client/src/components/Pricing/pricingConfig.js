export const pricingConfig = {
  plans: [
    {
      id: 'PLAN_STARTER',
      name: 'Developer Starter',
      baseUSD: 49,
      features: [
        'Up to 10 active pipelines',
        'Schema Validation (JSON Schema)',
        'Basic Retry Scheduler',
        '24-hour log retention',
        'Community Discord Support'
      ]
    },
    {
      id: 'PLAN_PRO',
      name: 'Production Pro',
      baseUSD: 129,
      features: [
        'Unlimited active pipelines',
        'Schema Validation (Protobuf/Avro/JSON)',
        'Dead-Letter Queue replay',
        'Prometheus Metric Exporter',
        '30-day telemetry retention',
        'Priority email support (under 4h)'
      ]
    },
    {
      id: 'PLAN_ENTERPRISE',
      name: 'Enterprise Scale',
      baseUSD: 399,
      features: [
        'Dedicated high-throughput brokers',
        'Automatic PII masking (HIPAA/GDPR)',
        'Custom Webhook integrations',
        'HA multi-region clustering',
        '1-year cold telemetry archiving',
        'Dedicated Solutions Architect (24/7)'
      ]
    }
  ],
  currencies: {
    USD: { symbol: '$', multiplier: 1.0, tariff: 1.0 },
    INR: { symbol: '₹', multiplier: 83.5, tariff: 1.18 }, // +18% regional tax/tariff
    EUR: { symbol: '€', multiplier: 0.92, tariff: 1.05 } // +5% regional tariff
  },
  billing: {
    monthly: { modifier: 1.0, label: 'monthly' },
    annual: { modifier: 0.8, label: 'annual' } // 20% discount
  }
};
