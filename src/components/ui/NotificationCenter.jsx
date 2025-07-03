import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New order received',
      message: 'John Doe placed an order for "Modern Website Design"',
      time: '2 minutes ago',
      unread: true,
      avatar: null,
      actionUrl: '/order-management'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment completed',
      message: 'Your payment of $250.00 has been processed successfully',
      time: '1 hour ago',
      unread: true,
      avatar: null,
      actionUrl: '/order-management'
    },
    {
      id: 3,
      type: 'milestone',
      title: 'Project milestone completed',
      message: 'Logo Design project milestone has been marked as complete',
      time: '3 hours ago',
      unread: false,
      avatar: null,
      actionUrl: '/order-management'
    },
    {
      id: 4,
      type: 'message',
      title: 'New message from Sarah',
      message: 'Hi! I have a question about the project requirements...',
      time: '5 hours ago',
      unread: false,
      avatar: null,
      actionUrl: '/order-management'
    },
    {
      id: 5,
      type: 'review',
      title: 'New 5-star review',
      message: 'Michael left a review: "Excellent work and fast delivery!"',
      time: '1 day ago',
      unread: false,
      avatar: null,
      actionUrl: '/service-detail-page'
    }
  ]);

  const notificationRef = useRef(null);
  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return 'Package';
      case 'payment':
        return 'CreditCard';
      case 'milestone':
        return 'CheckCircle';
      case 'message':
        return 'MessageCircle';
      case 'review':
        return 'Star';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order':
        return 'text-primary bg-primary-50';
      case 'payment':
        return 'text-success bg-success-50';
      case 'milestone':
        return 'text-accent bg-accent-50';
      case 'message':
        return 'text-secondary bg-secondary-50';
      case 'review':
        return 'text-warning bg-warning-50';
      default:
        return 'text-text-secondary bg-surface-hover';
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleNotificationClick = (notification) => {
    if (notification.unread) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className={`relative ${className}`} ref={notificationRef}>
      {/* Notification Trigger */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-surface-hover rounded-lg transition-all duration-200"
      >
        <Icon name="Bell" size={20} className="text-text-secondary" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-medium px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-surface rounded-lg shadow-elevation-4 border border-border z-1300 animate-slide-down">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-text-primary">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5 font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                onClick={markAllAsRead}
                className="text-primary text-sm hover:bg-primary-50"
              >
                Mark all read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary">No notifications yet</p>
                <p className="text-text-muted text-sm mt-1">
                  We'll notify you when something important happens
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`group relative border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors duration-200 cursor-pointer ${
                    notification.unread ? 'bg-primary-50/30' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      {/* Notification Icon */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                        <Icon 
                          name={getNotificationIcon(notification.type)} 
                          size={16} 
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-text-primary text-sm">
                              {notification.title}
                            </p>
                            <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-text-muted text-xs mt-2 flex items-center space-x-2">
                              <Icon name="Clock" size={12} />
                              <span>{notification.time}</span>
                            </p>
                          </div>

                          {/* Unread Indicator */}
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2 mt-1" />
                          )}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-error-50 hover:text-error"
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-border">
              <Button 
                variant="ghost" 
                className="w-full text-primary hover:bg-primary-50 justify-center"
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/order-management';
                }}
              >
                View all notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;