import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
        return (
            <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
                {label && (
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <input
                    className={`shadow appearance-none border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${className}`}
                    ref={ref}
                    {...props}
                />
                {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
