import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
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

interface LoginViewProps {
    onNavigate: (view: string) => void;
    onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate, onLoginSuccess }) => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const validateEmail = (val: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) return i18n.language.startsWith('fr') ? 'L\'e-mail est requis' : 'Email is required';
        if (!re.test(val)) return i18n.language.startsWith('fr') ? 'Veuillez saisir un e-mail valide' : 'Please enter a valid email';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const err = validateEmail(email);
        if (err) {
            setEmailError(err);
            return;
        }
        setEmailError(null);

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (email === 'error@example.com') {
            setError(i18n.language.startsWith('fr') ? 'Email ou mot de passe invalide. Veuillez réessayer.' : 'Invalid email or password. Please try again.');
            setIsLoading(false);
        } else {
            onLoginSuccess();
        }
    };

    const handleSocialLogin = async (provider: string) => {
        setSocialLoading(provider);
        await new Promise(resolve => setTimeout(resolve, 1200));
        setSocialLoading(null);
        // Toggle error state randomly for demo
        if (Math.random() > 0.8) {
            setError(i18n.language.startsWith('fr') ? `Échec de la connexion avec ${provider}. Réessayez.` : `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed. Try again.`);
        } else {
            onLoginSuccess();
        }
    };

    return (
        <AuthCard>
            <AuthHeader
                title={t('auth.welcomeBack')}
                subtitle={t('auth.signInDesc')}
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && <InlineErrorText message={error} />}

                <TextField
                    label={t('auth.email')}
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail size={16} />}
                    error={emailError || undefined}
                />

                <div className="space-y-1">
                    <PasswordField
                        label={t('auth.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => onNavigate('forgot-password')}
                            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                            {t('auth.forgotPassword')}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Checkbox label={t('auth.keepSignedIn')} />
                </div>

                <Button
                    type="submit"
                    className="w-full py-3 text-base font-bold"
                    isLoading={isLoading}
                    rightIcon={!isLoading && <ArrowRight size={18} />}
                >
                    {t('auth.login')}
                </Button>
            </form>

            <Divider>{t('auth.or')}</Divider>
            <div className="grid grid-cols-2 gap-3">
                <SocialAuthButton
                    provider="google"
                    isLoading={socialLoading === 'google'}
                    onClick={() => handleSocialLogin('google')}
                />
                <SocialAuthButton
                    provider="apple"
                    isLoading={socialLoading === 'apple'}
                    onClick={() => handleSocialLogin('apple')}
                />
                <SocialAuthButton
                    provider="microsoft"
                    isLoading={socialLoading === 'microsoft'}
                    onClick={() => handleSocialLogin('microsoft')}
                />
                <SocialAuthButton
                    provider="github"
                    isLoading={socialLoading === 'github'}
                    onClick={() => handleSocialLogin('github')}
                />
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {i18n.language.startsWith('fr') ? 'Nouveau sur Markaitek ?' : t('auth.newToMarkaitek').split('?')[0] + '?'}{' '}
                    <button
                        onClick={() => onNavigate('register')}
                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                        {i18n.language.startsWith('fr') ? 'Créer un compte' : t('auth.newToMarkaitek').split('?')[1].trim()}
                    </button>
                </p>
            </div>
        </AuthCard>
    );
};
