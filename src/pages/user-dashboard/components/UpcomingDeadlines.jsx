import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { formatDistance, addDays } from 'date-fns';

const UpcomingDeadlines = () => {
  const [deadlines, setDeadlines] = useState([
    {
      id: 1,
      title: 'Logo Design Delivery',
      client: 'Sarah Johnson',
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      priority: 'high',
      status: 'in-progress',
      progress: 75
    },
    {
      id: 2,
      title: 'Website Development - Phase 2',
      client: 'Tech Startup Inc.',
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      priority: 'medium',
      status: 'in-progress',
      progress: 45
    },
    {
      id: 3,
      title: 'Content Writing - Blog Posts',
      client: 'Marketing Agency',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      priority: 'medium',
      status: 'pending',
      progress: 20
    },
    {
      id: 4,
      title: 'Mobile App UI Design',
      client: 'John Smith',
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      priority: 'low',
      status: 'in-progress',
      progress: 60
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute for real-time countdowns
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error-50 text-error-600 border-error-200',
      medium: 'bg-warning-50 text-warning-600 border-warning-200',
      low: 'bg-success-50 text-success-600 border-success-200'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      'in-progress': 'bg-primary-50 text-primary-600',
      'pending': 'bg-warning-50 text-warning-600',
      'completed': 'bg-success-50 text-success-600'
    };
    return colors[status] || colors.pending;
  };

  const getTimeUntilDeadline = (deadline) => {
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff <= 0) return 'Overdue';
    if (daysDiff === 1) return 'Due tomorrow';
    if (daysDiff <= 7) return `Due in ${daysDiff} days`;
    
    return formatDistance(deadline, now, { addSuffix: true });
  };

  const isUrgent = (deadline) => {
    const now = new Date();
    const urgentThreshold = addDays(now, 3);
    return deadline <= urgentThreshold;
  };

  const sortedDeadlines = [...deadlines].sort((a, b) => a.deadline - b.deadline);

  return (
    <div className="bg-surface rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Upcoming Deadlines
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary-600 hover:text-primary-700"
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {sortedDeadlines.map((deadline) => (
          <div
            key={deadline.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              isUrgent(deadline.deadline) 
                ? 'border-error-200 bg-error-50/50' :'border-border bg-surface-hover'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-text-primary text-sm">
                    {deadline.title}
                  </h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(deadline.priority)}`}>
                    {deadline.priority}
                  </span>
                </div>
                
                <p className="text-text-secondary text-sm mb-2">
                  Client: {deadline.client}
                </p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-text-secondary" />
                    <span className={`${isUrgent(deadline.deadline) ? 'text-error-600 font-medium' : 'text-text-secondary'}`}>
                      {getTimeUntilDeadline(deadline.deadline)}
                    </span>
                  </div>
                  
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(deadline.status)}`}>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    <span className="capitalize">{deadline.status.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
              
              {isUrgent(deadline.deadline) && (
                <div className="flex-shrink-0 ml-2">
                  <Icon name="AlertTriangle" size={16} className="text-error-600" />
                </div>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">Progress</span>
                <span className="text-xs font-medium text-text-primary">
                  {deadline.progress}%
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    deadline.progress >= 75 ? 'bg-success-500' :
                    deadline.progress >= 50 ? 'bg-warning-500': 'bg-error-500'
                  }`}
                  style={{ width: `${deadline.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-600 hover:text-primary-700 text-xs"
              >
                View Details
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary hover:text-text-primary text-xs"
              >
                Update Progress
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            {sortedDeadlines.filter(d => isUrgent(d.deadline)).length} urgent deadlines
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="Calendar"
            className="text-primary-600 hover:text-primary-700"
          >
            View Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;