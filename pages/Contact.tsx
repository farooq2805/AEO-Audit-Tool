
import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="bg-blue-50 h-20 w-20 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Demo Request Received</h1>
        <p className="text-slate-600 text-center max-w-md mb-8">
          One of our GEO strategists will reach out within 2 business hours to schedule your platform walk-through.
        </p>
        <button onClick={() => setSubmitted(false)} className="text-blue-600 font-bold hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-24">
        <div>
          <h1 className="text-5xl font-bold text-slate-900 mb-8 leading-tight">Scale your <span className="text-blue-600">AI search visibility</span> with our team.</h1>
          <p className="text-xl text-slate-600 mb-12">
            Book a 15-minute consultation to see how AdVantage AI can boost your citations across ChatGPT, Perplexity, and more.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center mr-6 text-slate-400 group-hover:text-blue-600 transition-colors">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Email us</h3>
                <p className="text-slate-500">contact@advantageai.io</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center mr-6 text-slate-400 group-hover:text-blue-600 transition-colors">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Live chat</h3>
                <p className="text-slate-500">Available 9am - 6pm EST</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center mr-6 text-slate-400 group-hover:text-blue-600 transition-colors">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Office</h3>
                <p className="text-slate-500">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                <input required type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                <input required type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label>
              <input required type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Company Size</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors appearance-none">
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>201-500 employees</option>
                <option>500+ employees</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tell us about your GEO goals</label>
              <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 transition-colors" placeholder="I want to improve citations in Perplexity..."></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              Book my Demo
            </button>
            <p className="text-center text-xs text-slate-400">By clicking, you agree to our privacy policy.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
