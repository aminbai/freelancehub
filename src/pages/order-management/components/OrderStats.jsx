import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStats = ({ stats }) => {
  const statCards = [
    {
      id: 'total',
      label: 'Total Orders',
      value: stats.total || 0,
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary-50'
    },
    {
      id: 'active',
      label: 'Active Orders',
      value: stats.active || 0,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning-50'
    },
    {
      id: 'completed',
      label: 'Completed',
      value: stats.completed || 0,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success-50'
    },
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: `$${(stats.revenue || 0).toLocaleString()}`,
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-surface border-b border-border">
      {statCards.map((stat) => (
        <div key={stat.id} className="bg-background p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;