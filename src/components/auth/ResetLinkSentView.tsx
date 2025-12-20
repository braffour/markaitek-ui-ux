import React, { useState } from 'react';
import { MailCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { AuthHeader } from './AuthHeader';
import { AuthCard } from './AuthCard';
import { Button } from '../ui/Button';

interface ResetLinkSentViewProps {
    email: string;
    onNavigate: (view: string) => void;
}

export const ResetLinkSentView: React.FC<ResetLinkSentViewProps> = ({ email, onNavigate }) => {
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const handleResend = async () => {
        if (resendCooldown > 0) return;

        setIsResending(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsResending(false);
        setResendCooldown(60);

        const timer = setInterval(() => {
            setResendCooldown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <AuthCard>
            <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 border border-emerald-100 dark:border-emerald-500/20">
                    <MailCheck size={40} />
                </div>

                <AuthHeader
                    title="Check your email"
                    subtitle={`We've sent a password reset link to ${email}`}
                />

                <div className="w-full space-y-4 mt-4">
                    <Button
                        onClick={() => onNavigate('login')}
                        variant="primary"
                        className="w-full py-3 text-base font-bold"
                        leftIcon={<ArrowLeft size={18} />}
                    >
                        Back to login
                    </Button>

                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        Didn't receive the email?{' '}
                        <button
                            onClick={handleResend}
                            disabled={isResending || resendCooldown > 0}
                            className={`font-bold transition-colors ${resendCooldown > 0
                                    ? 'text-slate-400 cursor-not-allowed'
                                    : 'text-indigo-600 dark:text-indigo-400 hover:underline'
                                }`}
                        >
                            {isResending ? (
                                <RefreshCw size={14} className="animate-spin inline mr-1" />
                            ) : null}
                            {resendCooldown > 0
                                ? `Resend in ${resendCooldown}s`
                                : 'Click to resend'
                            }
                        </button>
                    </p>
                </div>
            </div>
        </AuthCard>
    );
};
