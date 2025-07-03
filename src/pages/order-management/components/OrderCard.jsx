import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onStatusUpdate, onViewDetails, isSelected = false }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': case'in progress':
        return 'bg-primary text-white';
      case 'completed':
        return 'bg-success text-white';
      case 'pending':
        return 'bg-warning text-white';
      case 'cancelled':
        return 'bg-error text-white';
      case 'disputed':
        return 'bg-secondary text-white';
      case 'delivered':
        return 'bg-accent text-white';
      default:
        return 'bg-text-muted text-white';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'border-l-error';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-success';
      default:
        return 'border-l-border';
    }
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: 'Overdue', color: 'text-error' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-warning' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-warning' };
    } else if (diffDays <= 3) {
      return { text: `${diffDays} days left`, color: 'text-warning' };
    } else {
      return { text: `${diffDays} days left`, color: 'text-text-secondary' };
    }
  };

  const deadline = formatDeadline(order.deadline);

  return (
    <div 
      className={`bg-surface border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200 cursor-pointer ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      } ${getPriorityColor(order.priority)} border-l-4`}
      onClick={() => onViewDetails(order)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-background">
            <Image
              src={order.thumbnail}
              alt={order.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary text-sm lg:text-base line-clamp-2 mb-1">
              {order.title}
            </h3>
            <p className="text-text-secondary text-xs lg:text-sm">
              Order #{order.id}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          {order.priority && (
            <span className="text-xs text-text-muted capitalize">
              {order.priority} priority
            </span>
          )}
        </div>
      </div>

      {/* Client/Freelancer Info */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-6 h-6 rounded-full overflow-hidden bg-background">
          <Image
            src={order.clientAvatar || order.freelancerAvatar}
            alt={order.clientName || order.freelancerName}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-text-secondary text-sm">
          {order.type === 'buyer' ? `Client: ${order.clientName}` : `Freelancer: ${order.freelancerName}`}
        </span>
      </div>

      {/* Progress Bar (for active orders) */}
      {order.status.toLowerCase() === 'active' && order.progress !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-text-secondary">Progress</span>
            <span className="text-xs text-text-secondary">{order.progress}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${order.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-text-muted mb-1">Amount</p>
          <p className="font-semibold text-text-primary text-sm lg:text-base">
            ${order.amount.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-text-muted mb-1">Deadline</p>
          <p className={`font-medium text-sm ${deadline.color}`}>
            {deadline.text}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          {order.hasMessages && (
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} className="text-primary" />
              <span className="text-xs text-primary">{order.messageCount}</span>
            </div>
          )}
          {order.hasFiles && (
            <Icon name="Paperclip" size={14} className="text-text-secondary" />
          )}
          {order.needsRevision && (
            <div className="flex items-center space-x-1">
              <Icon name="RotateCcw" size={14} className="text-warning" />
              <span className="text-xs text-warning">Revision</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {order.status.toLowerCase() === 'active' && (
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onStatusUpdate(order.id, 'delivered');
              }}
              className="text-xs px-2 py-1 h-auto"
            >
              Mark Complete
            </Button>
          )}
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(order);
            }}
            className="text-xs px-3 py-1 h-auto"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;