import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '49',
    description: 'Perfect for small projects and testing',
    features: [
      '3 websites',
      'Up to 5 languages',
      '10K monthly visitors',
      'Basic analytics',
      'Email support',
      '99.9% uptime SLA',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '149',
    description: 'For growing businesses going global',
    features: [
      '10 websites',
      'Up to 25 languages',
      '100K monthly visitors',
      'Advanced analytics',
      'Priority support',
      '99.99% uptime SLA',
      'Custom domains',
      'API access',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale operations',
    features: [
      'Unlimited websites',
      'All 50+ languages',
      'Unlimited visitors',
      'Enterprise analytics',
      'Dedicated support',
      '99.999% uptime SLA',
      'White-label options',
      'Custom integrations',
      'SSO & advanced security',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-32 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 neo-border neo-brutal-shadow-sm bg-[var(--accent-blue)] mb-6">
            <span className="text-sm font-bold letter-spacing-wider">PRICING</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black letter-spacing-wide mb-6">
            Simple, Transparent
            <br />
            Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, scale as you grow. All plans include 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`neo-border neo-brutal-shadow-lg p-8 relative ${
                plan.popular
                  ? 'bg-black text-white transform scale-105'
                  : 'bg-white hover:translate-x-2 hover:translate-y-2 hover:shadow-md transition-all'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 neo-border neo-brutal-shadow-sm bg-[var(--accent-yellow)] text-black">
                    <span className="text-xs font-bold letter-spacing-wider">
                      MOST POPULAR
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-black letter-spacing-wide mb-2">
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  {plan.price === 'Custom' ? (
                    <span className="text-5xl font-black letter-spacing-wide">
                      {plan.price}
                    </span>
                  ) : (
                    <>
                      <span className="text-2xl font-bold">$</span>
                      <span className="text-5xl font-black letter-spacing-wide">
                        {plan.price}
                      </span>
                      <span
                        className={`ml-2 ${
                          plan.popular ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        /month
                      </span>
                    </>
                  )}
                </div>
              </div>

              <Link to="/dashboard">
                <Button
                  className={`w-full mb-8 neo-border neo-brutal-shadow-md font-bold letter-spacing-wide ${
                    plan.popular
                      ? 'bg-white text-black hover:bg-white'
                      : 'bg-black text-white hover:bg-black'
                  } hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all`}
                >
                  {plan.cta}
                </Button>
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div
                      className={`w-5 h-5 neo-border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'bg-white' : 'bg-black'
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.popular ? 'text-black' : 'text-white'
                        }`}
                      />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center neo-border neo-brutal-shadow-xl bg-white p-8 max-w-3xl mx-auto">
          <p className="text-lg font-bold letter-spacing-wide mb-4">
            Need a custom solution?
          </p>
          <p className="text-gray-600 mb-6">
            We work with enterprises to build tailored multilingual solutions at scale.
          </p>
          <Button className="neo-border neo-brutal-shadow-md bg-black text-white hover:bg-black font-bold letter-spacing-wide">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
