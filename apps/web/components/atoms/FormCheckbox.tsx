'use client';

import { forwardRef } from 'react';

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              className="
                w-5 h-5 rounded border-2 cursor-pointer
                border-neutral-gray-300 dark:border-neutral-gray-700
                text-brand-gold focus:ring-2 focus:ring-brand-gold/50 focus:ring-offset-0
                bg-white dark:bg-deep-navy-800
                transition-all duration-200
                checked:bg-brand-gold checked:border-brand-gold
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              {...props}
            />
          </div>
          <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 select-none">
            {label}
          </span>
        </label>
        {error && (
          <p className="mt-1.5 ml-8 text-sm text-red-500 flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';
