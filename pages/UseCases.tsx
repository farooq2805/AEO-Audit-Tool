
import React from 'react';
import { Rocket, ShoppingCart, Users, Briefcase } from 'lucide-react';

const UseCases: React.FC = () => {
  const cases = [
    {
      segment: 'SaaS Founders',
      title: 'Become the standard recommendation.',
      desc: 'Ensure that when users ask ChatGPT for "the best CRM for startups," your brand is the primary citation.',
      icon: Rocket,
      stat: '2.5x increase in organic leads'
    },
    {
      segment: 'E-commerce',
      title: 'Surface in product comparisons.',
      desc: 'Dominate Perplexity and Google Search Generative Experience with product fact-rich citations.',
      icon: ShoppingCart,
      stat: '+40% Add-to-cart rate from AI'
    },
    {
      segment: 'Agencies',
      title: 'Offer high-value GEO as a service.',
      desc: 'Use our white-label tools to provide clients with next-gen visibility audits and reporting.',
      icon: Briefcase,
      stat: 'New recurring revenue stream'
    },
    {
      segment: 'Growth Teams',
      title: 'Track sentiment and share-of-voice.',
      desc: 'Monitor how AI agents describe your brand versus competitors in complex prompts.',
      icon: Users,
      stat: 'Real-time competitive edge'
    }
  ];

  return (
    <div className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 mb-20 text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Designed for high-impact teams.</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Different industries, one common goal: total AI visibility.</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8">
        {cases.map((c) => (
          <div key={c.segment} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <c.icon className="h-7 w-7" />
            </div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">{c.segment}</span>
            <h3 className="text-3xl font-bold text-slate-900 mt-4 mb-4 leading-tight">{c.title}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">{c.desc}</p>
            <div className="pt-8 border-t border-slate-100 font-bold text-slate-900">
              {c.stat}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCases;
