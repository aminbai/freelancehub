import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import RoleSelector from './RoleSelector';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const AuthForm = ({ mode, onSubmit, isLoading, onModeChange, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'signup') {
      if (!formData.role) newErrors.role = 'Please select your role';
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === 'signup' && (
        <>
          <RoleSelector
            selectedRole={formData.role}
            onRoleChange={(role) => handleInputChange('role', role)}
          />
          {errors.role && (
            <p className="text-error text-sm flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.role}</span>
            </p>
          )}
        </>
      )}

      <div className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
              Full Name *
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={errors.fullName ? 'border-error focus:ring-error' : ''}
            />
            {errors.fullName && (
              <p className="mt-1 text-error text-sm flex items-center space-x-1">
                <Icon name="AlertCircle" size={14} />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-error focus:ring-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-error text-sm flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            Password *
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`pr-10 ${errors.password ? 'border-error focus:ring-error' : ''}`}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface-hover"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} className="text-text-secondary" />
            </Button>
          </div>
          {errors.password && (
            <p className="mt-1 text-error text-sm flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.password}</span>
            </p>
          )}
          {mode === 'signup' && (
            <PasswordStrengthIndicator password={formData.password} />
          )}
        </div>

        {mode === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`pr-10 ${errors.confirmPassword ? 'border-error focus:ring-error' : ''}`}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface-hover"
              >
                <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} className="text-text-secondary" />
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-error text-sm flex items-center space-x-1">
                <Icon name="AlertCircle" size={14} />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {mode === 'login' && (
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-secondary">Remember me</span>
          </label>
          <Button
            type="button"
            variant="link"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:text-primary-600"
          >
            Forgot password?
          </Button>
        </div>
      )}

      {mode === 'signup' && (
        <div>
          <label className="flex items-start space-x-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              className="w-4 h-4 mt-1"
            />
            <span className="text-sm text-text-secondary">
              I agree to the{' '}
              <Button variant="link" className="text-primary hover:text-primary-600 p-0 h-auto">
                Terms of Service
              </Button>
              {' '}and{' '}
              <Button variant="link" className="text-primary hover:text-primary-600 p-0 h-auto">
                Privacy Policy
              </Button>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-error text-sm flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.acceptTerms}</span>
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        loading={isLoading}
        className="w-full py-3 text-base font-semibold"
      >
        {mode === 'signup' ? 'Create Account' : 'Sign In'}
      </Button>

      <div className="text-center">
        <span className="text-text-secondary text-sm">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
        </span>
        {' '}
        <Button
          type="button"
          variant="link"
          onClick={() => onModeChange(mode === 'signup' ? 'login' : 'signup')}
          className="text-primary hover:text-primary-600 font-medium"
        >
          {mode === 'signup' ? 'Sign In' : 'Sign Up'}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;