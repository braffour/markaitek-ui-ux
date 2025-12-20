import React, { useState } from 'react';
import { Mail, User, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AuthHeader } from './AuthHeader';
import { AuthCard } from './AuthCard';
import { TextField } from '../ui/TextField';
import { PasswordField } from './PasswordField';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Divider } from '../ui/Divider';
import { SocialAuthButton } from './SocialAuthButton';
import { InlineErrorText } from './InlineErrorText';

interface RegisterViewProps {
    onNavigate: (view: string) => void;
    onRegisterSuccess: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onNavigate, onRegisterSuccess }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setValidationErrors({});

        const errors: Record<string, string> = {};
        if (!name) errors.name = t('auth.validation.nameRequired');
        if (!email) errors.email = t('auth.validation.emailRequired');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t('auth.validation.emailInvalid');
        if (password.length < 8) errors.password = t('auth.validation.passwordLength');
        if (!agree) errors.agree = t('auth.validation.agreeRequired');

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            if (errors.agree) setError(errors.agree);
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        onRegisterSuccess();
    };

    return (
        <AuthCard>
            <AuthHeader
                title={t('auth.createAccount')}
                subtitle={t('auth.joinTeams')}
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && <InlineErrorText message={error} />}

                <TextField
                    label={t('auth.fullName')}
                    placeholder={t('auth.fullNamePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    leftIcon={<User size={16} />}
                    error={validationErrors.name}
                />

                <TextField
                    label={t('auth.email')}
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail size={16} />}
                    error={validationErrors.email}
                />

                <div className="space-y-1">
                    <PasswordField
                        label={t('auth.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        error={validationErrors.password}
                    />
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 ml-1">
                        {t('auth.passwordHint')}
                    </p>
                </div>

                <div className="py-2">
                    <Checkbox
                        label={t('auth.agreeTerms')}
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full py-3 text-base font-bold"
                    isLoading={isLoading}
                    rightIcon={!isLoading && <ArrowRight size={18} />}
                >
                    {t('auth.createAccountBtn')}
                </Button>
            </form>

            <Divider>{t('auth.or')}</Divider>
            <div className="grid grid-cols-2 gap-3">
                <SocialAuthButton provider="google" />
                <SocialAuthButton provider="apple" />
                <SocialAuthButton provider="microsoft" />
                <SocialAuthButton provider="github" />
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t('auth.alreadyHaveAccount').split('?')[0] + '?'}{' '}
                    <button
                        onClick={() => onNavigate('login')}
                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                        {t('auth.alreadyHaveAccount').split('?')[1].trim()}
                    </button>
                </p>
            </div>
        </AuthCard>
    );
};
