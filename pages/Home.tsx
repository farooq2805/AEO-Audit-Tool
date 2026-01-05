
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Activity, Layers, Target, CheckCircle2, AlertCircle, PlayCircle, Star } from 'lucide-react';
import { NavigationPaths, AuditResult } from '../types';
import { runGeoAudit } from '../services/geminiService';

const Home: React.FC = () => {
  const [auditInput, setAuditInput] = useState('');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditInput) return;
    setIsAuditing(true);
    const result = await runGeoAudit(auditInput);
    setAuditResult(result);
    setIsAuditing(false);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 bg-white">
        <div className="absolute inset-0 gradient-blur"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">The New Standard for AI Search</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8">
              Own the Answer inside <br className="hidden md:block"/> <span className="text-blue-600">AI Search Engines</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              AdVantage AI optimizes your brand's presence across ChatGPT, Perplexity, and Google AI Overviews. Ensure you're cited, trusted, and surfaced.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
              <form onSubmit={handleAudit} className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 rounded-2xl shadow-xl border border-slate-100">
                <input 
                  type="text" 
                  value={auditInput}
                  onChange={(e) => setAuditInput(e.target.value)}
                  placeholder="Enter your URL or Brand Name" 
                  className="px-6 py-3 w-full sm:w-64 md:w-80 outline-none text-slate-600 text-sm"
                />
                <button 
                  disabled={isAuditing}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all flex items-center justify-center whitespace-nowrap disabled:opacity-50"
                >
                  {isAuditing ? 'Analyzing...' : 'Run Free GEO Audit'}
                </button>
              </form>
              <Link 
                to={NavigationPaths.CONTACT}
                className="text-slate-600 font-medium text-sm flex items-center hover:text-slate-900 transition-colors"
              >
                Book a Demo <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            {/* Audit Result Display */}
            {auditResult && (
              <div className="max-w-3xl mx-auto mt-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 text-left">{auditResult.brand}</h3>
                    <p className="text-sm text-slate-500 text-left">Generative Engine Optimization (GEO) Score</p>
                  </div>
                  <div className="flex flex-col items-center">
                    {/* Fixed: Property 'score' does not exist on type 'AuditResult', using 'overallScore' */}
                    <span className={`text-4xl font-black ${auditResult.overallScore > 70 ? 'text-green-500' : 'text-orange-500'}`}>
                      {auditResult.overallScore}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Live AI Score</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h4 className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                      <Search className="h-4 w-4 mr-2 text-blue-500" /> AI Citation Insights
                    </h4>
                    <ul className="space-y-3">
                      {/* Fixed: Accessing the corrected 'insights' property */}
                      {auditResult.insights.map((insight, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-600">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 shrink-0 mt-0.5" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                      <Target className="h-4 w-4 mr-2 text-purple-500" /> Optimization Path
                    </h4>
                    <ul className="space-y-3">
                      {auditResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-600">
                          <Activity className="h-4 w-4 mr-2 text-purple-500 shrink-0 mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-slate-50 bg-slate-50/30">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Trusted by Global Marketing Teams</p>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50">
            <img src="https://picsum.photos/id/101/100/30?grayscale" alt="Partner 1" className="h-6" />
            <img src="https://picsum.photos/id/102/100/30?grayscale" alt="Partner 2" className="h-6" />
            <img src="https://picsum.photos/id/103/100/30?grayscale" alt="Partner 3" className="h-6" />
            <img src="https://picsum.photos/id/104/100/30?grayscale" alt="Partner 4" className="h-6" />
            <img src="https://picsum.photos/id/105/100/30?grayscale" alt="Partner 5" className="h-6" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Traditional SEO is no longer enough for <span className="text-blue-600">AI search</span>.
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Backlinks and keywords only get you so far. Large Language Models (LLMs) don't search by links; they look for entities, citations, and semantic truth. If you aren't optimized for GEO, your brand is invisible to the millions of users switching to AI search engines.
              </p>
              <ul className="space-y-4">
                {[
                  "AI Engines bypass traditional link-based rankings",
                  "LLMs prioritize direct entity citations",
                  "Your brand voice is lost in generic AI summaries",
                  "Invisible citations lead to massive traffic loss"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                  <div className="h-32 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center justify-center p-6 text-slate-400 text-sm italic">
                    "Searching for 'best B2B analytics platform'..."
                  </div>
                  <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4">
                    <div className="h-3 bg-blue-500/40 rounded w-full mb-2"></div>
                    <div className="h-3 bg-blue-500/40 rounded w-5/6 mb-2"></div>
                    <div className="h-3 bg-blue-500/40 rounded w-4/6"></div>
                    <div className="mt-4 flex items-center text-xs font-bold text-blue-400">
                      <Star className="h-3 w-3 mr-1 fill-blue-400" /> CITED BY GPT-4O
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Demo Preview */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Real-time Visibility Analytics</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Track your brand presence across 15+ generative engines with enterprise-grade precision.
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border border-white">
            <div className="p-8 grid md:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Global AI Visibility</p>
                  <p className="text-3xl font-bold text-blue-600">84.2%</p>
                  <div className="mt-2 h-1 w-full bg-slate-100 rounded">
                    <div className="h-full w-[84%] bg-blue-600 rounded"></div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Citations in GPT-4</p>
                  <p className="text-3xl font-bold text-purple-600">1,402</p>
                  <p className="text-xs text-green-500 mt-1 font-bold">+12.4% vs last week</p>
                </div>
              </div>
              <div className="md:col-span-2 bg-white/50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-slate-900">Search Landscape Distribution</h3>
                  <div className="flex space-x-2">
                    <div className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-500">7 DAYS</div>
                    <div className="px-2 py-1 rounded bg-blue-600 text-[10px] font-bold text-white">30 DAYS</div>
                  </div>
                </div>
                <div className="h-48 flex items-end justify-between px-4">
                  {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <div key={i} className="w-8 md:w-12 bg-blue-600/10 rounded-t-lg relative group transition-all">
                      <div 
                        style={{ height: `${h}%` }} 
                        className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg group-hover:bg-blue-500 transition-colors"
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 px-4 text-[10px] font-bold text-slate-400 uppercase">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Breakdown */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 transition-all">
              <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">GEO Auditor</h3>
              <p className="text-slate-600 leading-relaxed">
                Scan your entire site structure to see exactly how LLMs process your content and identify citation gaps before competitors do.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 transition-all">
              <div className="h-12 w-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Layers className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Creative Sprint</h3>
              <p className="text-slate-600 leading-relaxed">
                Automated content re-structuring tools that make your existing data perfectly machine-readable and cite-worthy for all AI agents.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 transition-all">
              <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Entity Engine</h3>
              <p className="text-slate-600 leading-relaxed">
                Build authority at the entity level. We ensure AI engines link your brand to the core topics and keywords that drive revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Scale your AI visibility</h2>
            <p className="text-slate-400 text-lg">Simple, transparent pricing for teams of all sizes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-slate-400 text-sm mb-6">For early-stage startups.</p>
              <div className="text-4xl font-bold mb-8">$19<span className="text-sm font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" /> 5 GEO Audits / mo</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" /> Weekly Visibility Reports</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" /> Core Entity Monitoring</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-slate-600 font-medium hover:bg-white hover:text-slate-900 transition-all">Get Started</button>
            </div>
            <div className="bg-blue-600 p-8 rounded-3xl border border-blue-500 shadow-2xl relative">
              <div className="absolute top-0 right-0 mt-4 mr-4 bg-white/20 text-[10px] font-bold px-2 py-1 rounded">MOST POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <p className="text-blue-100 text-sm mb-6">For scaling SaaS & agencies.</p>
              <div className="text-4xl font-bold mb-8">$49<span className="text-sm font-normal text-blue-200">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-blue-50) ">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-white" /> 50 GEO Audits / mo</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-white" /> Daily Sentiment Analysis</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-white" /> Advanced Entity Engine</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-white" /> Competitor Citation Tracking</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-white text-blue-600 font-bold hover:bg-blue-50 transition-all">Select Pro</button>
            </div>
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
              <h3 className="text-xl font-bold mb-2">Agency</h3>
              <p className="text-slate-400 text-sm mb-6">For high-performance teams.</p>
              <div className="text-4xl font-bold mb-8">$99<span className="text-sm font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" /> Unlimited Audits</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" /> White-label Reporting</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" /> API Access</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" /> Dedicated GEO Strategist</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-slate-600 font-medium hover:bg-white hover:text-slate-900 transition-all">Book Consultation</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="bg-slate-50 rounded-[3rem] py-20 px-4 border border-slate-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-blue-100/50 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 bg-purple-100/50 rounded-full blur-3xl"></div>
             
             <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight relative">Ready to win the <br/> AI search era?</h2>
             <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative">
                <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                  Run Free GEO Audit
                </button>
                <Link to={NavigationPaths.CONTACT} className="text-slate-900 font-bold text-lg hover:text-blue-600 flex items-center">
                  Book a Demo <PlayCircle className="h-6 w-6 ml-2" />
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
