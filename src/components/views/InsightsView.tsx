import React from 'react';
import { Wand2, History } from 'lucide-react';

const PAST_SUCCESS_INSIGHTS = [
    { id: 1, name: "Jira to Slack Sync", reliable: "99.9%", time: "2h ago" },
    { id: 2, name: "Q3 Report Generation", reliable: "98.5%", time: "1d ago" },
];

const InsightsView = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-6 overflow-y-auto">
            <div className="w-full max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Let's make magic happen.</h2>
                    <p className="text-slate-400 text-lg">Auto-fit automation based on your historical success patterns.</p>
                </div>

                <div className="bg-brand-surface/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 border border-brand-border overflow-hidden">
                    {/* Main Intent Card */}
                    <div className="p-8 bg-gradient-to-b from-white/5 to-transparent">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Describe Integration Intent</label>
                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="e.g. Sync SalesForce Closed-Won deals to NetSuite as invoices"
                                className="w-full text-xl p-4 border-b-2 border-brand-border focus:border-brand-blue outline-none bg-transparent placeholder-slate-600 text-white transition-colors"
                            />
                            <Wand2 className="absolute right-4 top-4 text-brand-blue" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Primary Systems</label>
                                <div className="flex flex-wrap gap-2">
                                    {['SalesForce', 'NetSuite', 'Slack', 'Gmail'].map(sys => (
                                        <button key={sys} className="px-4 py-1.5 border border-brand-border rounded-full text-sm text-slate-300 hover:border-brand-blue hover:text-brand-blue transition bg-brand-dark/50 backdrop-blur-sm">
                                            {sys}
                                        </button>
                                    ))}
                                    <button className="px-3 py-1.5 border border-dashed border-slate-600 rounded-full text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">+</button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Constraints</label>
                                <div className="flex gap-3">
                                    <select className="flex-1 p-2.5 bg-brand-dark/50 border border-brand-border rounded-lg text-sm text-slate-300 outline-none focus:ring-2 focus:ring-brand-blue/20">
                                        <option>Budget: Standard</option>
                                        <option>Budget: Low Cost</option>
                                    </select>
                                    <select className="flex-1 p-2.5 bg-brand-dark/50 border border-brand-border rounded-lg text-sm text-slate-300 outline-none focus:ring-2 focus:ring-brand-blue/20">
                                        <option>Sec: High</option>
                                        <option>Sec: Standard</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Insights Panel */}
                    <div className="bg-brand-dark/30 p-6 border-t border-brand-border">
                        <div className="flex items-start gap-4">
                            <div className="bg-brand-blue/10 p-2.5 rounded-xl text-brand-blue mt-1">
                                <History size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-slate-200 mb-1">Memory Insight</h4>
                                <p className="text-sm text-slate-400 mb-4 leading-relaxed">Based on your last 50 workflows, we recommend using the <span className="font-mono bg-brand-dark px-1.5 py-0.5 rounded text-xs text-slate-200 border border-brand-border">Finance-v2</span> connector pack.</p>

                                <div className="space-y-2">
                                    {PAST_SUCCESS_INSIGHTS.map(item => (
                                        <div key={item.id} className="flex justify-between items-center bg-brand-dark p-3 rounded-lg border border-brand-border text-sm shadow-sm">
                                            <span className="text-slate-200 font-medium">{item.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-slate-400">{item.time}</span>
                                                <span className="text-xs font-bold text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-900/30">{item.reliable} Reliable</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsView;
