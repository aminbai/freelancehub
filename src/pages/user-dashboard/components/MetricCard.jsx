import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend = 'neutral', 
  icon, 
  color = 'primary',
  badge = false
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    error: 'bg-error-50 text-error-600',
    accent: 'bg-accent-50 text-accent-600',
    secondary: 'bg-secondary-50 text-secondary-600'
  };

  const trendClasses = {
    up: 'text-success-600',
    down: 'text-error-600',
    neutral: 'text-text-secondary'
  };

  const trendIcons = {
    up: 'TrendingUp',
    down: 'TrendingDown',
    neutral: 'Minus'
  };

  return (
    <div className="bg-surface rounded-lg p-4 lg:p-6 border border-border hover:border-primary-200 transition-colors duration-200 relative">
      {badge && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-error rounded-full animate-pulse"></div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon name={icon} size={20} />
        </div>
        
        <div className={`flex items-center space-x-1 text-sm ${trendClasses[trend]}`}>
          <Icon name={trendIcons[trend]} size={14} />
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
        <p className="text-text-primary text-2xl lg:text-3xl font-bold">{value}</p>
        {change && (
          <p className={`text-xs ${trendClasses[trend]}`}>
            {change}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;