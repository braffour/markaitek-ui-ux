import React from 'react';
import { Wand2, History, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PAST_SUCCESS_INSIGHTS } from '../../constants';

const LuckyView = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className="h-full flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto w-full custom-scrollbar">
            <div className="w-full max-w-5xl space-y-10 md:space-y-12 animate-in fade-in zoom-in-95 duration-700 pb-20 md:pb-0">

                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-6 bg-brand-accent/5 backdrop-blur-3xl rounded-[32px] mb-4 border border-brand-accent/20 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-brand-accent/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        <Wand2 className="text-brand-accent shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500" size={48} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text-primary leading-tight">
                        {t('insights.magic')}
                    </h2>
                    <p className="text-brand-text-muted text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium uppercase tracking-[0.1em] opacity-60">
                        {t('insights.description')}
                    </p>
                </div>

                <div className="bg-brand-surface-1/30 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden border border-brand-border-low relative group/card">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 blur-[120px] -mr-48 -mt-48 pointer-events-none group-hover/card:bg-brand-accent/10 transition-all duration-1000"></div>

                    {/* Main Intent Card */}
                    <div className="p-8 md:p-14 relative z-10 transition-all">
                        <label className="block text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.3em] mb-4 px-2 opacity-50">{t('insights.intent')}</label>
                        <div className="relative mb-12 group/input">
                            <div className="absolute -inset-4 bg-brand-accent/5 rounded-3xl opacity-0 group-focus-within/input:opacity-100 transition-all duration-500 blur-xl"></div>
                            <input
                                type="text"
                                placeholder={t('insights.intentPlaceholder')}
                                className="w-full text-2xl md:text-4xl py-6 bg-transparent border-none outline-none placeholder-brand-text-muted/20 font-extrabold text-brand-text-primary relative z-10 tracking-tight"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-border-low rounded-full overflow-hidden">
                                <div className="h-full bg-brand-accent w-0 group-focus-within/input:w-full transition-all duration-700 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                            </div>
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-brand-accent hover:bg-brand-accent-hover text-brand-bg p-4 rounded-2xl opacity-0 group-focus-within/input:opacity-100 transition-all shadow-2xl shadow-brand-accent/20 hover:scale-105 active:scale-95">
                                <ArrowRight size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <label className="block text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.3em] mb-5 px-2 opacity-50">{t('insights.primarySystems')}</label>
                                <div className="flex flex-wrap gap-3">
                                    {['SalesForce', 'NetSuite', 'Slack', 'Gmail'].map(sys => (
                                        <button key={sys} className="px-5 py-2.5 bg-brand-surface-2/40 border border-brand-border-low rounded-xl text-[12px] font-bold text-brand-text-secondary hover:border-brand-accent/40 hover:text-brand-accent transition-all hover:bg-brand-surface-2 hover:shadow-xl hover:-translate-y-0.5 shadow-sm uppercase tracking-wider">
                                            {sys}
                                        </button>
                                    ))}
                                    <button className="w-10 h-10 flex items-center justify-center border-2 border-dashed border-brand-border-low rounded-xl text-brand-text-muted hover:text-brand-accent hover:border-brand-accent/40 transition-all hover:bg-brand-surface-2">+</button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.3em] mb-5 px-2 opacity-50">{t('insights.constraints')}</label>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <select className="flex-1 px-4 py-3 bg-brand-surface-2/40 border border-brand-border-low rounded-xl text-[12px] font-bold text-brand-text-primary outline-none focus:ring-4 focus:ring-brand-accent/5 focus:border-brand-accent/40 shadow-inner appearance-none custom-select uppercase tracking-widest">
                                        <option>{t('insights.budget')}</option>
                                        <option>{i18n.language.startsWith('fr') ? 'Budget : Économique' : 'Budget: Low Cost'}</option>
                                    </select>
                                    <select className="flex-1 px-4 py-3 bg-brand-surface-2/40 border border-brand-border-low rounded-xl text-[12px] font-bold text-brand-text-primary outline-none focus:ring-4 focus:ring-brand-accent/5 focus:border-brand-accent/40 shadow-inner appearance-none custom-select uppercase tracking-widest">
                                        <option>{t('insights.security')}</option>
                                        <option>{i18n.language.startsWith('fr') ? 'Séc : Standard' : 'Sec: Standard'}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Insights Panel */}
                    <div className="bg-brand-surface-2/20 backdrop-blur-md p-8 md:p-12 border-t border-brand-border-low relative shadow-inner">
                        <div className="absolute top-0 left-12 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-bg shadow-2xl px-5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.25em]">
                            {t('insights.suggestion')}
                        </div>

                        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                            <div className="hidden lg:flex w-16 h-16 bg-brand-surface-1 border border-brand-border-low rounded-[24px] items-center justify-center text-brand-accent shadow-2xl group/icon transition-all hover:scale-105">
                                <History size={28} className="group-hover/icon:-rotate-45 transition-transform duration-500" />
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="lg:hidden bg-brand-surface-1 p-2.5 rounded-xl text-brand-accent border border-brand-border-low">
                                        <History size={20} />
                                    </div>
                                    <h4 className="font-extrabold text-brand-text-primary text-xl md:text-2xl tracking-tight">{t('insights.memoryInsight')}</h4>
                                </div>
                                <p className="text-[14px] text-brand-text-secondary mb-10 leading-relaxed font-medium max-w-3xl">{t('insights.recommendation')}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {PAST_SUCCESS_INSIGHTS.map(item => (
                                        <div key={item.id} className="flex justify-between items-center bg-brand-surface-1/40 backdrop-blur-xl p-5 rounded-2xl border border-brand-border-low hover:bg-brand-surface-1 hover:border-brand-accent/30 transition-all cursor-default group/item shadow-sm hover:shadow-2xl hover:shadow-black/40">
                                            <div>
                                                <span className="text-brand-text-primary font-bold group-hover/item:text-brand-accent transition-colors uppercase tracking-widest text-[11px] block mb-1">{item.name}</span>
                                                <span className="text-[10px] text-brand-text-muted font-bold opacity-60 uppercase tracking-tighter">{t('insights.timeAgo', { time: item.time })}</span>
                                            </div>
                                            <div className="flex flex-col items-end gap-1.5">
                                                <div className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-lg">
                                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{t('insights.reliable', { value: item.reliable.replace('%', '') })}</span>
                                                </div>
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
