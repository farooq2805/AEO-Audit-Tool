
import React, { useState, useEffect } from 'react';
import { Globe, Cpu, ArrowRight, TrendingUp, ExternalLink, ShieldCheck, AlertCircle, MessageSquare, ListFilter, Info } from 'lucide-react';
import { runGeoAudit } from '../services/geminiService';
import { AuditResult, ProviderMetrics } from '../types';

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const duration = 1500;
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return <>{displayValue}</>;
};

const AeoChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Grounding Search API...",
    "Scanning Live Citations...",
    "Crawling Knowledge Graphs...",
    "Verifying Engine Rank Intent...",
    "Synthesizing Evidence-Based Report..."
  ];

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const data = await runGeoAudit(url);
      setResult(data);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const RadialScore = ({ score }: { score: number }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    
    let color = "#f97316"; 
    if (score > 60) color = "#3b82f6";
    if (score < 40) color = "#ef4444";

    return (
      <div className="relative flex items-center justify-center h-48">
        <svg className="transform -rotate-90 w-full h-full p-2">
          <circle cx="50%" cy="50%" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
          <circle 
            cx="50%" cy="50%" r={radius} 
            fill="transparent" stroke={color} 
            strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-5xl font-light text-slate-800 tracking-tighter">
          <AnimatedNumber value={score} />
        </span>
      </div>
    );
  };

  const MetricBar = ({ label, score, max }: { label: string; score: number; max: number }) => {
    const percentage = (score / max) * 100;
    let barColor = "bg-orange-500";
    if (percentage > 70) barColor = "bg-emerald-500";
    if (percentage < 30) barColor = "bg-red-500";

    return (
      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm font-medium text-slate-900">{label}</span>
          <span className="text-sm font-bold text-slate-900">
            {score}<span className="text-slate-400 font-normal">/{max}</span>
          </span>
        </div>
        <div className="h-4 w-full bg-slate-100 rounded-sm overflow-hidden">
          <div style={{ width: `${percentage}%` }} className={`h-full ${barColor} transition-all duration-1000`} />
        </div>
      </div>
    );
  };

  const ProviderColumn = ({ title, icon, metrics }: { title: string; icon: string; metrics: ProviderMetrics }) => (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 h-12 flex items-center">
        <img src={icon} alt={title} className="h-full object-contain grayscale opacity-80" />
      </div>
      
      <div className="mb-10 w-full max-w-[200px]">
        <RadialScore score={metrics.overallScore} />
      </div>

      <p className="text-lg font-bold text-slate-900 mb-8 h-14 flex items-center justify-center px-4">
        {metrics.statusText}
      </p>

      {/* Query Ranking Widget */}
      <div className="w-full mb-8 text-left bg-blue-50/40 p-5 rounded-2xl border border-blue-100/50">
        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center">
          <ListFilter className="h-3 w-3 mr-2" /> Verified Rank Intent
        </h4>
        <div className="space-y-2">
          {metrics.topQueries && metrics.topQueries.length > 0 ? (
            metrics.topQueries.map((q, i) => (
              <div key={i} className="text-[11px] leading-relaxed text-slate-700 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-100 italic shadow-sm">
                "{q}"
              </div>
            ))
          ) : (
            <div className="text-[11px] text-slate-400 py-3 text-center italic">No citation footprint found</div>
          )}
        </div>
      </div>

      <div className="w-full bg-white p-8 rounded-xl text-left border border-slate-50 shadow-sm">
        <MetricBar label="Brand Recognition" score={metrics.brandRecognition} max={20} />
        <MetricBar label="Market Score" score={metrics.marketScore} max={10} />
        <MetricBar label="Presence Quality" score={metrics.presenceQuality} max={20} />
        <MetricBar label="Brand Sentiment" score={metrics.brandSentiment} max={40} />
        <MetricBar label="Share of Voice" score={metrics.shareOfVoice} max={10} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-32">
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Verified AI Visibility Grader</h1>
          <p className="text-slate-500 text-lg mb-10">Real-time grounding across Google Search to audit actual engine-specific rankings.</p>
          
          <form onSubmit={handleCheck} className="relative max-w-xl mx-auto mb-8">
            <div className="flex items-center bg-white border-2 border-slate-100 rounded-full p-2 focus-within:border-blue-500 transition-all shadow-xl">
              <Globe className="ml-4 h-6 w-6 text-slate-300" />
              <input 
                type="text" value={url} onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter Brand Name (e.g. 'Stripe' or 'OpenAI')" 
                className="flex-grow py-3 px-4 bg-transparent outline-none text-slate-800 text-lg"
                disabled={isAnalyzing}
              />
              <button 
                type="submit" disabled={isAnalyzing}
                className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center"
              >
                {isAnalyzing ? 'Scanning Web...' : 'Verify Brand'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {isAnalyzing && (
          <div className="py-24 text-center">
            <div className="w-24 h-24 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin mx-auto mb-8" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{steps[loadingStep]}</h3>
            <p className="text-slate-400">Performing live search grounding to prevent hallucinated data...</p>
          </div>
        )}

        {result && !isAnalyzing && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Dashboard Hero */}
            <div className="mb-12 bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />
              
              <div className="flex-shrink-0 text-center relative z-10">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Verified Overall Score</div>
                <div className="text-9xl font-black text-slate-900 tracking-tighter leading-none">
                  <AnimatedNumber value={result.overallScore} />
                </div>
                <div className={`mt-4 inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${result.overallScore > 0 ? 'bg-slate-900 text-white' : 'bg-red-100 text-red-600'}`}>
                   {result.overallScore === 0 ? 'Brand Not Found' : `Performance: ${result.overallScore > 60 ? 'Optimal' : result.overallScore > 40 ? 'Fair' : 'Critical'}`}
                </div>
              </div>

              <div className="h-px md:h-32 w-full md:w-px bg-slate-100 relative z-10" />
              
              <div className="flex-grow relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{result.brand} AEO Assessment</h3>
                <p className="text-slate-600 leading-relaxed text-lg italic bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  "{result.summary}"
                </p>
              </div>
            </div>

            {/* Evidence & Verification Source Section */}
            {result.groundingSources && result.groundingSources.length > 0 && (
              <div className="mb-20 bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-blue-100">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <ShieldCheck className="h-7 w-7 mr-3 text-blue-200" /> Grounding Evidence
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {result.groundingSources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 p-5 rounded-2xl border border-white/20 transition-all flex justify-between items-center group text-left"
                    >
                      <div className="truncate pr-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Source {idx + 1}</p>
                        <p className="font-bold truncate text-sm group-hover:underline">{source.title}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {result.overallScore === 0 && (
              <div className="mb-20 bg-red-50 p-12 rounded-[2.5rem] border border-red-100 flex items-center gap-8">
                <AlertCircle className="h-12 w-12 text-red-500 shrink-0" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-red-900 mb-2">Audit Unsuccessful</h3>
                  <p className="text-red-700">We could not verify this brand's existence via real-time search grounding. The data shown above reflects a 'Not Found' state. This is typically due to a brand having zero Knowledge Graph presence or indexing issues.</p>
                </div>
              </div>
            )}

            {/* Main Column Grid */}
            <div className="grid lg:grid-cols-[200px_1fr] gap-12">
              <div className="space-y-24 pt-[180px] hidden lg:block text-left">
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest">AEO Node</div>
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest mt-12">Engine Score</div>
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest pt-24">Verified Intents</div>
                <div className="space-y-12 pt-[180px]">
                  <div className="text-sm font-bold text-slate-500">Brand Recognition</div>
                  <div className="text-sm font-bold text-slate-500">Market Score</div>
                  <div className="text-sm font-bold text-slate-500">Presence Quality</div>
                  <div className="text-sm font-bold text-slate-500">Brand Sentiment</div>
                  <div className="text-sm font-bold text-slate-500">Share of Voice</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {result.providers && (
                  <>
                    <ProviderColumn 
                      title="OpenAI" 
                      icon="https://cdn.worldvectorlogo.com/logos/openai-2.svg" 
                      metrics={result.providers.openai} 
                    />
                    <ProviderColumn 
                      title="Perplexity" 
                      icon="https://cdn.worldvectorlogo.com/logos/perplexity-ai.svg" 
                      metrics={result.providers.perplexity} 
                    />
                    <ProviderColumn 
                      title="Gemini" 
                      icon="https://cdn.worldvectorlogo.com/logos/google-2015.svg" 
                      metrics={result.providers.gemini} 
                    />
                  </>
                )}
              </div>
            </div>

            {/* Roadmap */}
            <div className="mt-32 grid md:grid-cols-2 gap-12 text-left">
              <div className="bg-slate-900 text-white p-12 rounded-[3rem]">
                <h3 className="text-3xl font-bold mb-8 flex items-center">
                  <TrendingUp className="h-8 w-8 mr-4 text-blue-400" /> Intent Capture Roadmap
                </h3>
                <ul className="space-y-6">
                  {result.recommendations?.map((rec, i) => (
                    <li key={i} className="flex items-start">
                      <div className="h-6 w-6 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center mr-4 shrink-0 mt-1">
                        {i + 1}
                      </div>
                      <p className="text-slate-300 font-medium">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-slate-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                     Structural Optimization <Info className="h-5 w-5 text-blue-500" />
                  </h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    A low score is often a technical failure, not a brand failure. By optimizing your site's fact-density and assertion mapping, we can secure your citation as the definitive answer for the queries identified above.
                  </p>
                </div>
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                  Speak with a GEO Architect
                </button>
              </div>
            </div>
          </div>
        )}

        {!result && !isAnalyzing && (
          <div className="mt-20 flex flex-col items-center justify-center opacity-30 select-none grayscale py-20">
            <div className="grid grid-cols-3 gap-12 mb-12">
               <div className="h-40 w-40 rounded-full border-8 border-slate-100" />
               <div className="h-40 w-40 rounded-full border-8 border-slate-100" />
               <div className="h-40 w-40 rounded-full border-8 border-slate-100" />
            </div>
            <h2 className="text-2xl font-black text-slate-400 tracking-widest uppercase">Verified Grounding Mode</h2>
            <p className="text-slate-400">Enter a verified brand to map engine-specific rankings and visibility.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AeoChecker;
