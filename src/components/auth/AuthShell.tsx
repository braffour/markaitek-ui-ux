import React, { useState } from 'react';
import { LoginView } from './LoginView';
import { RegisterView } from './RegisterView';
import { ForgotPasswordView } from './ForgotPasswordView';
import { ResetLinkSentView } from './ResetLinkSentView';
import { EmailVerificationView } from './EmailVerificationView';
import { Toast } from '../ui/Toast';

interface AuthShellProps {
    onAuthenticated: () => void;
}

export const AuthShell: React.FC<AuthShellProps> = ({ onAuthenticated }) => {
    const [view, setView] = useState('login');
    const [email, setEmail] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleLoginSuccess = () => {
        showToast('Login successful! Redirecting...');
        setTimeout(onAuthenticated, 1000);
    };

    const handleRegisterSuccess = () => {
        showToast('Account created successfully!');
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
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {renderView()}
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
