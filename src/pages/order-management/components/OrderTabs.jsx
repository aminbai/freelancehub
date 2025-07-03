import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderTabs = ({ activeTab, onTabChange, orderCounts }) => {
  const tabs = [
    {
      id: 'active',
      label: 'Active',
      icon: 'Clock',
      count: orderCounts.active || 0
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: 'CheckCircle',
      count: orderCounts.completed || 0
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      icon: 'XCircle',
      count: orderCounts.cancelled || 0
    },
    {
      id: 'disputed',
      label: 'Disputed',
      icon: 'AlertTriangle',
      count: orderCounts.disputed || 0
    }
  ];

  return (
    <div className="bg-surface border-b border-border">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="font-medium">{tab.label}</span>
            {tab.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === tab.id
                  ? 'bg-primary text-white' :'bg-background text-text-secondary'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderTabs;