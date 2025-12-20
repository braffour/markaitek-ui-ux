import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { TextField } from '../ui/TextField';

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ label = 'Password', error, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            label={label}
            type={showPassword ? 'text' : 'password'}
            leftIcon={<Lock size={16} />}
            rightIcon={
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            }
            error={error}
            {...props}
        />
    );
};
