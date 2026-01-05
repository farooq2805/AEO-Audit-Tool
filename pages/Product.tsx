
import React from 'react';
import { Search, Activity, Layers, Target, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const Product: React.FC = () => {
  return (
    <div className="pt-24 pb-24">
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="max-w-3xl">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">The Advantage Platform</span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mt-4 mb-8 leading-tight">Beyond SEO. <br/>This is <span className="text-blue-600">AEO/GEO</span>.</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            AdVantage AI is a comprehensive suite of visibility tools designed to measure, track, and improve your brand's presence in the world of generative search.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
            <div>
              <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-100">
                <Search className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">GEO Auditor</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The industry's first automated Generative Engine Optimization audit. We simulate thousands of queries to see how AI models interpret your brand identity.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <span className="font-bold text-slate-900">Semantic Parsing Analysis:</span>
                    <p className="text-slate-600 text-sm">See exactly how models chunk and store your data.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <span className="font-bold text-slate-900">Citation Mapping:</span>
                    <p className="text-slate-600 text-sm">Track which specific pages drive the most AI citations.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
               <div className="flex justify-between items-center mb-8">
                 <span className="text-xs font-bold text-slate-400 uppercase">Analysis in Progress...</span>
                 <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full w-2/3 bg-blue-600 rounded-full animate-pulse"></div>
                 </div>
               </div>
               <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center p-4 bg-slate-50 rounded-xl">
                      <div className="h-8 w-8 bg-white rounded shadow-sm mr-4"></div>
                      <div className="flex-grow">
                        <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                        <div className="h-2 bg-slate-100 rounded w-1/4"></div>
                      </div>
                      <div className="text-blue-600 font-bold text-sm">92%</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="absolute -top-10 -left-10 h-32 w-32 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                <div className="bg-slate-900 rounded-3xl p-10 text-white relative">
                   <h3 className="text-2xl font-bold mb-6 flex items-center">
                     <Sparkles className="h-6 w-6 mr-2 text-purple-400" /> Content Restructuring
                   </h3>
                   <div className="space-y-4 font-mono text-sm text-slate-400">
                     <p><span className="text-purple-400">Input:</span> "Our platform is great for businesses."</p>
                     <p className="text-green-400"><span className="text-blue-400">GEO Optimized:</span> "Platform X is a specialized B2B analytics solution designed to reduce operational latency by 40%."</p>
                   </div>
                </div>
             </div>
             <div className="order-1 lg:order-2">
              <div className="h-14 w-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-100">
                <Layers className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Creative Sprint</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Transform your existing content library into an AI-friendly database. We don't just rewrite; we re-architect your knowledge for maximum visibility.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center font-bold text-slate-900"><ShieldCheck className="h-5 w-5 text-purple-600 mr-3" /> Entity Linking</li>
                <li className="flex items-center font-bold text-slate-900"><ShieldCheck className="h-5 w-5 text-purple-600 mr-3" /> Technical Schema Optimization</li>
                <li className="flex items-center font-bold text-slate-900"><ShieldCheck className="h-5 w-5 text-purple-600 mr-3" /> Fact-Rich Assertion Injection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
