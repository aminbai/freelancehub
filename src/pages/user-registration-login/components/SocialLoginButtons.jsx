import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginButtons = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      bgColor: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-white',
      borderColor: 'border-blue-700'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-secondary">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => onSocialLogin(provider.id)}
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-2 py-3 ${provider.bgColor} ${provider.textColor} border ${provider.borderColor} transition-all duration-200`}
          >
            <Icon name={provider.icon} size={20} />
            <span className="font-medium">{provider.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLoginButtons;