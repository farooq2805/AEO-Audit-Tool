
import React from 'react';
import { Search, Activity, Target, Zap } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Analyze your current AI footprint',
      desc: 'Connect your domain and our GEO Auditor runs a deep scan across 15+ LLMs to map where you are cited and where you are invisible.',
      icon: Search,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Structural Content Re-alignment',
      desc: 'Our Creative Sprint tools automatically identify content sections that confuse AI agents and suggest semantic structures that boost citation probability.',
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Entity & Authority Linking',
      desc: 'We publish high-density structured data and optimized summaries that help AI engines connect your brand to specific solution categories.',
      icon: Target,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 mb-24">
        <h1 className="text-5xl font-bold text-slate-900 mb-8 text-center">Three steps to <span className="text-blue-600">AI dominance</span>.</h1>
        <p className="text-xl text-slate-600 text-center max-w-3xl mx-auto">
          We've simplified the complex world of AEO/GEO into an actionable, performance-driven workflow.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 space-y-24">
        {steps.map((step, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-8 ${step.color}`}>
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
            <div className="flex-1 w-full bg-slate-50 rounded-[3rem] aspect-video flex items-center justify-center border border-slate-100">
               <div className="p-8 w-full">
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-4 bg-blue-400 rounded w-4/6 opacity-50"></div>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
