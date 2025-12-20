import React, { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { AuthHeader } from './AuthHeader';
import { AuthCard } from './AuthCard';
import { TextField } from '../ui/TextField';
import { Button } from '../ui/Button';

interface ForgotPasswordViewProps {
    onNavigate: (view: string) => void;
    onSuccess: (email: string) => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onNavigate, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError(null);
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        onSuccess(email);
    };

    return (
        <AuthCard>
            <button
                onClick={() => onNavigate('login')}
                className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to login
            </button>

            <AuthHeader
                title="Forgot Password?"
                subtitle="No worries, we'll send you reset instructions"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <TextField
                    label="Email Address"
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                    }}
                    leftIcon={<Mail size={16} />}
                    error={error || undefined}
                />

                <Button
                    type="submit"
                    className="w-full py-3 text-base font-bold"
                    isLoading={isLoading}
                    rightIcon={!isLoading && <Send size={18} />}
                >
                    Send reset link
                </Button>
            </form>
        </AuthCard>
    );
};
