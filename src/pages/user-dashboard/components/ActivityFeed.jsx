import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { formatDistance } from 'date-fns';

const ActivityFeed = ({ expanded = false }) => {
  const [showAll, setShowAll] = useState(false);
  
  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'New order received',
      description: 'Sarah Johnson placed an order for "Professional Logo Design"',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      icon: 'Package',
      color: 'success',
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      title: 'New message from client',
      description: 'Mike Chen sent you a message about the website project',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      icon: 'MessageCircle',
      color: 'primary',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment received',
      description: 'Payment of $250 has been processed for order #12345',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'DollarSign',
      color: 'success',
      priority: 'low'
    },
    {
      id: 4,
      type: 'milestone',
      title: 'Project milestone completed',
      description: 'Logo Design project milestone 2 of 3 has been completed',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon: 'CheckCircle',
      color: 'accent',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'review',
      title: 'New review received',
      description: 'Jennifer Davis left a 5-star review for your web development service',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'Star',
      color: 'warning',
      priority: 'low'
    },
    {
      id: 6,
      type: 'system',
      title: 'Profile optimization tip',
      description: 'Add more portfolio items to increase your visibility by 30%',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'Lightbulb',
      color: 'secondary',
      priority: 'low'
    }
  ];

  const displayedActivities = showAll || expanded ? activities : activities.slice(0, 3);

  const getStatusColor = (type) => {
    const colors = {
      order: 'bg-success-50 text-success-600',
      message: 'bg-primary-50 text-primary-600',
      payment: 'bg-success-50 text-success-600',
      milestone: 'bg-accent-50 text-accent-600',
      review: 'bg-warning-50 text-warning-600',
      system: 'bg-secondary-50 text-secondary-600'
    };
    return colors[type] || 'bg-text-secondary text-white';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Recent Activity
        </h3>
        <span className="text-sm text-text-secondary">
          {activities.length} updates
        </span>
      </div>
      
      <div className="space-y-4">
        {displayedActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-surface-hover transition-colors duration-200"
          >
            <div className={`p-2 rounded-lg ${getStatusColor(activity.type)} flex-shrink-0`}>
              <Icon name={activity.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-text-primary font-medium text-sm">
                  {activity.title}
                </h4>
                {activity.priority === 'high' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-error-50 text-error-600">
                    High
                  </span>
                )}
              </div>
              
              <p className="text-text-secondary text-sm mb-2">
                {activity.description}
              </p>
              
              <div className="flex items-center space-x-2">
                <span className="text-text-muted text-xs">
                  {formatDistance(activity.timestamp, new Date(), { addSuffix: true })}
                </span>
                {activity.type === 'order' && (
                  <Button
                    variant="ghost"
                    size="xs"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View Order
                  </Button>
                )}
                {activity.type === 'message' && (
                  <Button
                    variant="ghost"
                    size="xs"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Reply
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {!expanded && activities.length > 3 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-primary-600 hover:text-primary-700"
          >
            {showAll ? 'Show Less' : `View All ${activities.length} Activities`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;