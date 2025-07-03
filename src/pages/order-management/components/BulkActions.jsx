import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedOrders, onBulkAction, onClearSelection }) => {
  const [showActions, setShowActions] = useState(false);

  if (selectedOrders.length === 0) return null;

  const bulkActionOptions = [
    {
      id: 'mark-delivered',
      label: 'Mark as Delivered',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      id: 'request-revision',
      label: 'Request Revision',
      icon: 'RotateCcw',
      color: 'text-warning'
    },
    {
      id: 'send-message',
      label: 'Send Message',
      icon: 'MessageCircle',
      color: 'text-primary'
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      color: 'text-text-secondary'
    }
  ];

  const handleBulkAction = (actionId) => {
    onBulkAction(actionId, selectedOrders);
    setShowActions(false);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-1/2 transform -translate-x-1/2 bg-surface border border-border rounded-lg shadow-elevation-3 p-4 z-1100 animate-slide-up">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="CheckSquare" size={16} className="text-primary" />
          <span className="font-medium text-text-primary">
            {selectedOrders.length} order{selectedOrders.length !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button
              variant="primary"
              onClick={() => setShowActions(!showActions)}
              className="flex items-center space-x-2"
            >
              <Icon name="Settings" size={16} />
              <span>Actions</span>
              <Icon name="ChevronDown" size={14} />
            </Button>

            {showActions && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-surface rounded-lg shadow-elevation-3 border border-border animate-slide-down">
                <div className="py-2">
                  {bulkActionOptions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleBulkAction(action.id)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name={action.icon} size={16} className={action.color} />
                      <span className="text-text-primary">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={onClearSelection}
            className="flex items-center space-x-2"
          >
            <Icon name="X" size={16} />
            <span>Clear</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;