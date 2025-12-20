import React, { useState } from 'react';
import { Mail, User, ArrowRight } from 'lucide-react';
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
        if (!name) errors.name = 'Full name is required';
        if (!email) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';
        if (password.length < 8) errors.password = 'Password must be at least 8 characters';
        if (!agree) errors.agree = 'You must agree to the terms';

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
                title="Create Account"
                subtitle="Join thousands of teams building with AI"
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && <InlineErrorText message={error} />}

                <TextField
                    label="Full Name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    leftIcon={<User size={16} />}
                    error={validationErrors.name}
                />

                <TextField
                    label="Email Address"
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail size={16} />}
                    error={validationErrors.email}
                />

                <div className="space-y-1">
                    <PasswordField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        error={validationErrors.password}
                    />
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 ml-1">
                        Use 8 or more characters with a mix of letters, numbers & symbols
                    </p>
                </div>

                <div className="py-2">
                    <Checkbox
                        label="I agree to the Terms of Service and Privacy Policy"
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
                    Create account
                </Button>
            </form>

            <Divider>or</Divider>
            <div className="grid grid-cols-2 gap-3">
                <SocialAuthButton provider="google" />
                <SocialAuthButton provider="apple" />
                <SocialAuthButton provider="microsoft" />
                <SocialAuthButton provider="github" />
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Already have an account?{' '}
                    <button
                        onClick={() => onNavigate('login')}
                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </AuthCard>
    );
};
