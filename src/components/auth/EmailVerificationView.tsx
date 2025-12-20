import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AuthHeader } from './AuthHeader';
import { AuthCard } from './AuthCard';
import { Button } from '../ui/Button';

interface EmailVerificationViewProps {
    email: string;
    onContinue: () => void;
    onNavigate: (view: string) => void;
}

export const EmailVerificationView: React.FC<EmailVerificationViewProps> = ({
    email,
    onContinue,
    onNavigate
}) => {
    const { t } = useTranslation();
    const [isResending, setIsResending] = useState(false);

    const handleResend = async () => {
        setIsResending(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsResending(false);
    };

    return (
        <AuthCard>
            <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 border border-indigo-100 dark:border-indigo-500/20">
                    <ShieldCheck size={40} />
                </div>

                <AuthHeader
                    title={t('auth.verifyEmailTitle')}
                    subtitle={`${t('auth.verifyEmailDesc')} ${email}`}
                />

                <div className="w-full space-y-4 mt-8">
                    <Button
                        onClick={onContinue}
                        className="w-full py-3 text-base font-bold"
                    >
                        {t('auth.verifiedBtn')}
                    </Button>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {t('auth.didntReceiveEmail').split('?')[0] + '?'}{' '}
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handleResend}
                                disabled={isResending}
                                className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                            >
                                {isResending && <RefreshCw size={14} className="animate-spin" />}
                                {t('auth.resendEmail')}
                            </button>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                            <button
                                onClick={() => onNavigate('register')}
                                className="text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:underline"
                            >
                                {t('auth.changeEmail')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthCard>
    );
};
