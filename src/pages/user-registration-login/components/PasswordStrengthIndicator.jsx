import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    score = Object.values(checks).filter(Boolean).length;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-error', textColor: 'text-error' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-warning', textColor: 'text-warning' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-accent', textColor: 'text-accent' };
    return { score, label: 'Strong', color: 'bg-success', textColor: 'text-success' };
  };

  const strength = getPasswordStrength(password);
  const requirements = [
    { key: 'length', label: 'At least 8 characters', met: password.length >= 8 },
    { key: 'lowercase', label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { key: 'uppercase', label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { key: 'numbers', label: 'One number', met: /\d/.test(password) },
    { key: 'symbols', label: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">Password strength</span>
          <span className={`text-xs font-medium ${strength.textColor}`}>
            {strength.label}
          </span>
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                level <= strength.score ? strength.color : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        {requirements.map((req) => (
          <div key={req.key} className="flex items-center space-x-2">
            <Icon 
              name={req.met ? "CheckCircle" : "Circle"} 
              size={14} 
              className={req.met ? "text-success" : "text-text-muted"} 
            />
            <span className={`text-xs ${req.met ? "text-success" : "text-text-secondary"}`}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;