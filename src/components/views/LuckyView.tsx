import React from 'react';
import { Wand2, History, ArrowRight } from 'lucide-react';
import { PAST_SUCCESS_INSIGHTS } from '../../constants';

const LuckyView = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto w-full">
            <div className="w-full max-w-4xl space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20 md:pb-0">

                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 rounded-2xl mb-2 shadow-inner">
                        <Wand2 className="text-indigo-600 dark:text-indigo-300" size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Let's make magic happen.</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">Auto-fit automation based on your historical success patterns.</p>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100/50 dark:shadow-black/50 overflow-hidden border border-white/50 dark:border-white/10 ring-1 ring-slate-900/5 dark:ring-white/5">
                    {/* Main Intent Card */}
                    <div className="p-6 md:p-10 bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-indigo-900/10">
                        <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-1">Describe Integration Intent</label>
                        <div className="relative mb-8 group">
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-200 dark:bg-slate-700 group-focus-within:bg-indigo-600 dark:group-focus-within:bg-indigo-400 transition-colors duration-300"></div>
                            <input
                                type="text"
                                placeholder="e.g. Sync SalesForce Closed-Won deals to NetSuite as invoices"
                                className="w-full text-lg md:text-2xl py-4 bg-transparent border-none outline-none placeholder-slate-300 dark:placeholder-slate-600 font-medium text-slate-800 dark:text-slate-100"
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full opacity-0 group-focus-within:opacity-100 transition-all hover:bg-indigo-700 shadow-lg shadow-indigo-600/30">
                                <ArrowRight size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-1">Primary Systems</label>
                                <div className="flex flex-wrap gap-2">
                                    {['SalesForce', 'NetSuite', 'Slack', 'Gmail'].map(sys => (
                                        <button key={sys} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all bg-white dark:bg-slate-800 hover:shadow-md hover:-translate-y-0.5">
                                            {sys}
                                        </button>
                                    ))}
                                    <button className="px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-full text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-400 transition-colors">+</button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-1">Constraints</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <select className="flex-1 p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20">
                                        <option>Budget: Standard</option>
                                        <option>Budget: Low Cost</option>
                                    </select>
                                    <select className="flex-1 p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20">
                                        <option>Sec: High</option>
                                        <option>Sec: Standard</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Insights Panel */}
                    <div className="bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-md p-6 md:p-8 border-t border-slate-100 dark:border-slate-700 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-400 uppercase tracking-widest">
                            AI Suggestion
                        </div>
                        <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-5">
                            <div className="hidden sm:block bg-white dark:bg-slate-800 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700">
                                <History size={24} />
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-2 mb-2 sm:mb-1">
                                    <div className="sm:hidden bg-white dark:bg-slate-800 p-2 rounded-xl text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700">
                                        <History size={18} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">Memory Insight</h4>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">Based on your last 50 workflows, we recommend using the <span className="font-mono bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded text-xs font-bold border border-indigo-100 dark:border-indigo-800">Finance-v2</span> connector pack.</p>

                                <div className="space-y-2.5">
                                    {PAST_SUCCESS_INSIGHTS.map(item => (
                                        <div key={item.id} className="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 text-sm shadow-sm hover:shadow-md transition-shadow cursor-default group">
                                            <span className="text-slate-700 dark:text-slate-200 font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.name}</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-slate-400 font-medium">{item.time}</span>
                                                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 px-2 py-0.5 rounded-full">{item.reliable} Reliable</span>
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

export default LuckyView;
