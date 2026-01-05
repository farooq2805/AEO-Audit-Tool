
import React from 'react';
import { BookOpen, HelpCircle, ChevronRight } from 'lucide-react';

const Education: React.FC = () => {
  const faqs = [
    {
      q: 'What is Generative Engine Optimization (GEO)?',
      a: 'GEO is the practice of optimizing your brand and content to be more effectively retrieved and cited by Large Language Models like ChatGPT and Perplexity. Unlike SEO, which focuses on link rankings, GEO focuses on semantic relevance and entity relationships.'
    },
    {
      q: 'How is AEO different from standard SEO?',
      a: 'Answer Engine Optimization (AEO) is about providing direct, concise answers that AI engines can easily extract. SEO is about page structure and authority; AEO is about fact-density and clarity of assertions.'
    },
    {
      q: 'Can AI search engines read my website?',
      a: 'Yes, but they process it differently. They use web crawlers (like GPTBot) to scrape content, which is then indexed into vector databases. AdVantage AI helps you format your content so it is favored during this vector retrieval process.'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 mb-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-slate-900 mb-8">The AEO/GEO <span className="text-blue-600">Knowledge Base</span>.</h1>
          <p className="text-xl text-slate-600">Everything you need to know about the transition from traditional search to generative search.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-12 mb-32">
        <div className="lg:col-span-2 space-y-8">
          {faqs.map((f, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-start">
                <HelpCircle className="h-6 w-6 mr-3 text-blue-600 shrink-0 mt-1" />
                {f.q}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed ml-9">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="space-y-8">
           <div className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-2xl">
             <BookOpen className="h-10 w-10 mb-6 text-blue-400" />
             <h3 className="text-2xl font-bold mb-4">The GEO Whitepaper</h3>
             <p className="text-slate-400 text-sm mb-8 leading-relaxed">Download our 45-page guide on why entity authority is the new backlink.</p>
             <button className="w-full py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center">
               Download PDF <ChevronRight className="h-4 w-4 ml-2" />
             </button>
           </div>
           <div className="p-8 rounded-[2rem] border border-slate-100 bg-white">
             <h3 className="font-bold text-slate-900 mb-4">Latest Insights</h3>
             <ul className="space-y-4 text-sm text-slate-600">
               <li className="hover:text-blue-600 cursor-pointer transition-colors border-b border-slate-50 pb-2">Why GPTBot is ignoring your FAQ</li>
               <li className="hover:text-blue-600 cursor-pointer transition-colors border-b border-slate-50 pb-2">Structured Data vs Semantic Truth</li>
               <li className="hover:text-blue-600 cursor-pointer transition-colors border-b border-slate-50 pb-2">Case Study: 300% growth via Perplexity</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
