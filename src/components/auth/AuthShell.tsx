import React, { useState } from 'react';
import { LoginView } from './LoginView';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../ui/LanguageSelector';
import { RegisterView } from './RegisterView';
import { ForgotPasswordView } from './ForgotPasswordView';
import { ResetLinkSentView } from './ResetLinkSentView';
import { EmailVerificationView } from './EmailVerificationView';
import { Toast } from '../ui/Toast';
import bgImage from '../../assets/auth-bg.png';

interface AuthShellProps {
    onAuthenticated: () => void;
}

export const AuthShell: React.FC<AuthShellProps> = ({ onAuthenticated }) => {
    const { t, i18n } = useTranslation();
    const [view, setView] = useState('login');
    const [email, setEmail] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleLoginSuccess = () => {
        showToast(i18n.language.startsWith('fr') ? 'Connexion réussie ! Redirection...' : 'Login successful! Redirecting...');
        setTimeout(onAuthenticated, 1000);
    };

    const handleRegisterSuccess = () => {
        showToast(i18n.language.startsWith('fr') ? 'Compte créé avec succès !' : 'Account created successfully!');
        setView('verify-email');
    };

    const handleForgotPasswordSuccess = (targetEmail: string) => {
        setEmail(targetEmail);
        setView('reset-link-sent');
    };

    const renderView = () => {
        switch (view) {
            case 'login':
                return <LoginView onNavigate={setView} onLoginSuccess={handleLoginSuccess} />;
            case 'register':
                return <RegisterView onNavigate={setView} onRegisterSuccess={handleRegisterSuccess} />;
            case 'forgot-password':
                return <ForgotPasswordView onNavigate={setView} onSuccess={handleForgotPasswordSuccess} />;
            case 'reset-link-sent':
                return <ResetLinkSentView email={email} onNavigate={setView} />;
            case 'verify-email':
                return (
                    <EmailVerificationView
                        email={email || 'your-email@example.com'}
                        onContinue={onAuthenticated}
                        onNavigate={setView}
                    />
                );
            default:
                return <LoginView onNavigate={setView} onLoginSuccess={handleLoginSuccess} />;
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-brand-bg transition-colors duration-500 overflow-hidden relative">
            {/* Background Image with Blur and Gradient Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center grayscale-[20%] scale-105 blur-sm opacity-40 after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#0F1519]/75 after:via-brand-bg/40 after:to-transparent"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

            <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {renderView()}
            </div>

            {/* Language Selector in Auth Flow */}
            <div className="fixed bottom-6 right-6 z-20">
                <LanguageSelector variant="login" />
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};
