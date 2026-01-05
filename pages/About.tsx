
import React from 'react';
import { Activity } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-24">
          <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-100">
            <Activity className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">Our mission is <br/> <span className="text-blue-600">Truth & Visibility</span>.</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            AdVantage AI was founded in 2024 by a team of SEO veterans and AI researchers who saw a fundamental shift in how humanity discovers information.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-24 items-center mb-32">
          <div className="bg-slate-50 rounded-[3rem] aspect-square flex items-center justify-center border border-slate-100 overflow-hidden">
            <img src="https://picsum.photos/id/201/800/800" alt="Team Workshop" className="object-cover w-full h-full opacity-80" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">We help brands bridge the gap between human content and machine intelligence.</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              As Large Language Models become the primary interface for search, the rules of marketing are being rewritten. AdVantage AI provides the tools to ensure your brand's unique value isn't just recorded, but cited accurately and consistently.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We believe in a world where quality, factual information wins over generic noise. Our platform is built to amplify the brands that deserve to be at the center of the conversation.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[4rem] py-24 px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-16">The Principles of AdVantage AI</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Fact-Density First</h3>
              <p className="text-slate-400 text-sm">We believe that being cited requires being useful. We optimize for high-value information density.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Machine Readability</h3>
              <p className="text-slate-400 text-sm">AI engines are our audience. We prioritize semantic structures that machines can parse without friction.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Total Transparency</h3>
              <p className="text-slate-400 text-sm">We provide clear, data-backed metrics that prove exactly how AI engines perceive your brand presence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
