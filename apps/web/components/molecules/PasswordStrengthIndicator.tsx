'use client';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const calculateStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return Math.min(strength, 4);
  };

  const getStrengthLabel = (strength: number): string => {
    if (strength === 0) return 'Very Weak';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = (strength: number): string => {
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-orange-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthTextColor = (strength: number): string => {
    if (strength === 0) return 'text-red-500';
    if (strength === 1) return 'text-orange-500';
    if (strength === 2) return 'text-yellow-600 dark:text-yellow-500';
    if (strength === 3) return 'text-blue-500';
    return 'text-green-500';
  };

  if (!password) return null;

  const strength = calculateStrength(password);

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bars */}
      <div className="flex gap-1.5">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`
              h-1.5 flex-1 rounded-full transition-all duration-300
              ${index < strength
                ? getStrengthColor(strength)
                : 'bg-neutral-gray-200 dark:bg-neutral-gray-700'
              }
            `}
          />
        ))}
      </div>

      {/* Strength Label */}
      <p className={`text-xs font-semibold ${getStrengthTextColor(strength)}`}>
        Password strength: {getStrengthLabel(strength)}
      </p>

      {/* Requirements */}
      {strength < 3 && (
        <div className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400 space-y-1">
          <p className="font-medium">Password should contain:</p>
          <ul className="space-y-0.5 ml-4">
            <li className={password.length >= 8 ? 'text-green-600' : ''}>
              • At least 8 characters
            </li>
            <li className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-green-600' : ''}>
              • Uppercase and lowercase letters
            </li>
            <li className={/\d/.test(password) ? 'text-green-600' : ''}>
              • At least one number
            </li>
            <li className={/[^a-zA-Z0-9]/.test(password) ? 'text-green-600' : ''}>
              • At least one special character
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
