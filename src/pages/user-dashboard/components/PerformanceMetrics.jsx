import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ userRole, metrics }) => {
  const freelancerMetrics = [
    {
      title: 'Overall Rating',
      value: metrics?.rating || 4.9,
      suffix: '/5.0',
      icon: 'Star',
      color: 'warning',
      trend: '+0.2 this month'
    },
    {
      title: 'Completion Rate',
      value: metrics?.completionRate || 98.5,
      suffix: '%',
      icon: 'CheckCircle',
      color: 'success',
      trend: '+2.1% this month'
    },
    {
      title: 'Response Time',
      value: metrics?.responseTime || '2h',
      suffix: ' avg',
      icon: 'Clock',
      color: 'primary',
      trend: '-30min this week'
    },
    {
      title: 'Repeat Clients',
      value: 67,
      suffix: '%',
      icon: 'Users',
      color: 'secondary',
      trend: '+5% this month'
    }
  ];

  const clientMetrics = [
    {
      title: 'Projects Completed',
      value: 24,
      suffix: '',
      icon: 'CheckCircle',
      color: 'success',
      trend: '+3 this month'
    },
    {
      title: 'Avg Project Rating',
      value: 4.7,
      suffix: '/5.0',
      icon: 'Star',
      color: 'warning',
      trend: '+0.3 this month'
    },
    {
      title: 'Response Time',
      value: '4h',
      suffix: ' avg',
      icon: 'Clock',
      color: 'primary',
      trend: '-1h this week'
    },
    {
      title: 'Preferred Freelancers',
      value: 12,
      suffix: '',
      icon: 'Heart',
      color: 'error',
      trend: '+2 this month'
    }
  ];

  const displayMetrics = userRole === 'freelancer' ? freelancerMetrics : clientMetrics;

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'bg-success-50 text-success-600',
      warning: 'bg-warning-50 text-warning-600',
      error: 'bg-error-50 text-error-600',
      primary: 'bg-primary-50 text-primary-600',
      secondary: 'bg-secondary-50 text-secondary-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Performance Metrics
        </h3>
        <Icon name="TrendingUp" size={16} className="text-success-600" />
      </div>
      
      <div className="space-y-4">
        {displayMetrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                <Icon name={metric.icon} size={16} />
              </div>
              
              <div>
                <h4 className="font-medium text-text-primary text-sm">
                  {metric.title}
                </h4>
                <p className="text-text-secondary text-xs">
                  {metric.trend}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-text-primary font-bold text-lg">
                {metric.value}
                <span className="text-text-secondary text-sm font-normal">
                  {metric.suffix}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Performance Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">
              {userRole === 'freelancer' ? 'Freelancer' : 'Client'} Score
            </p>
            <p className="text-xs text-text-secondary">
              Based on all metrics
            </p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-2 bg-border rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-success-500 to-success-600 rounded-full"
                  style={{ width: '92%' }}
                ></div>
              </div>
              <span className="text-sm font-bold text-success-600">
                92%
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Excellent performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;