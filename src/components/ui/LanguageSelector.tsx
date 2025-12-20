import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
    variant?: 'header' | 'login';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'header' }) => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(nextLang);
    };

    const currentLang = i18n.language.split('-')[0].toUpperCase();

    if (variant === 'login') {
        return (
            <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2 py-1 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-500 dark:text-slate-400 transition-all shadow-sm"
            >
                <Languages size={12} />
                <span>{currentLang === 'EN' ? 'FR' : 'EN'}</span>
            </button>
        );
    }

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-all group"
            title="Switch Language"
        >
            <div className={`p-1 rounded-md transition-colors ${i18n.language.startsWith('fr') ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'}`}>
                <Languages size={14} />
            </div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {currentLang}
            </span>
            <ChevronDown size={12} className="text-slate-300 dark:text-slate-600" />
        </button>
    );
};
