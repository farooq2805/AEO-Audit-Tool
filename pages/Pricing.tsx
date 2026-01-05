
import React from 'react';
import { CheckCircle2, Minus } from 'lucide-react';

const Pricing: React.FC = () => {
  const tiers = [
    {
      name: 'Starter',
      price: '$19',
      desc: 'For growing startups starting with GEO.',
      features: ['5 Monthly GEO Audits', 'Weekly Insight Reports', 'Basic Entity Monitoring', 'Email Support'],
      notIncluded: ['Competitor Benchmarking', 'API Access', 'Custom Workflows']
    },
    {
      name: 'Growth',
      price: '$49',
      desc: 'Most popular for established SaaS.',
      popular: true,
      features: ['50 Monthly GEO Audits', 'Daily Visibility Reports', 'Advanced Entity Engine', 'Competitor Comparison', 'Sentiment Tracking', 'Priority Support'],
      notIncluded: ['White-label Reporting', 'API Access']
    },
    {
      name: 'Agency',
      price: '$99',
      desc: 'The complete solution for marketing teams.',
      features: ['Unlimited GEO Audits', 'Custom AI Simulation', 'Full API Access', 'White-label Reports', 'Dedicated Account Strategist', '24/7 Phone Support'],
      notIncluded: []
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 text-center mb-20">
        <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Investment in Visibility</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Secure your brand's future in the AI-first world. Choose the plan that fits your growth strategy.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div key={tier.name} className={`relative flex flex-col p-10 rounded-[2.5rem] border ${tier.popular ? 'border-blue-600 bg-white shadow-2xl scale-105 z-10' : 'border-slate-100 bg-slate-50'}`}>
            {tier.popular && (
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                Recommended
              </div>
            )}
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
            <p className="text-slate-500 text-sm mb-8">{tier.desc}</p>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-bold text-slate-900">{tier.price}</span>
              <span className="text-slate-500 ml-2">/ month</span>
            </div>
            <button className={`w-full py-4 rounded-2xl font-bold text-lg mb-10 transition-all ${tier.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
              Select {tier.name}
            </button>
            <div className="space-y-4 flex-grow">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Included Features</p>
              {tier.features.map(f => (
                <div key={f} className="flex items-center text-slate-700 text-sm">
                  <CheckCircle2 className={`h-4 w-4 mr-3 ${tier.popular ? 'text-blue-600' : 'text-slate-400'}`} />
                  {f}
                </div>
              ))}
              {tier.notIncluded.map(f => (
                <div key={f} className="flex items-center text-slate-400 text-sm italic">
                  <Minus className="h-4 w-4 mr-3" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
