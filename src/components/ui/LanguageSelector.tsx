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
                className="flex items-center gap-2 px-3 py-1.5 bg-brand-surface-1/50 hover:bg-brand-surface-1 border border-brand-border-low rounded-xl text-[11px] font-bold text-brand-text-secondary transition-all shadow-sm"
            >
                <Languages size={14} />
                <span className="uppercase">{currentLang === 'EN' ? 'FR' : 'EN'}</span>
            </button>
        );
    }

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-brand-surface-1 rounded-xl transition-all group"
            title="Switch Language"
        >
            <div className={`p-1 rounded-lg transition-colors ${i18n.language.startsWith('fr') ? 'bg-brand-accent/20 text-brand-accent' : 'text-brand-text-muted group-hover:text-brand-accent'}`}>
                <Languages size={14} />
            </div>
            <span className="text-[11px] font-bold text-brand-text-secondary group-hover:text-brand-text-primary uppercase tracking-wider">
                {currentLang}
            </span>
            <ChevronDown size={12} className="text-brand-text-muted/50" />
        </button>
    );
};
