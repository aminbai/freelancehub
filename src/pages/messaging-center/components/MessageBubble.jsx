import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { formatDistance } from 'date-fns';

const MessageBubble = ({ message, isFirst, isLast }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <Icon name="Clock" size={12} className="text-text-muted" />;
      case 'delivered':
        return <Icon name="Check" size={12} className="text-text-secondary" />;
      case 'read':
        return <Icon name="CheckCheck" size={12} className="text-primary-500" />;
      default:
        return null;
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderAttachments = (attachments) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="mt-2 space-y-2">
        {attachments.map((attachment) => (
          <div 
            key={attachment.id}
            className="flex items-center space-x-2 p-2 bg-surface rounded-lg border border-border"
          >
            <div className="p-1 bg-primary-50 rounded">
              <Icon 
                name={attachment.type.startsWith('image/') ? 'Image' : 'File'} 
                size={14} 
                className="text-primary-600" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary truncate">
                {attachment.name}
              </p>
              <p className="text-xs text-text-secondary">
                {(attachment.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-600 hover:text-primary-700"
            >
              <Icon name="Download" size={14} />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
        {/* Message Bubble */}
        <div
          className={`px-4 py-2 rounded-2xl ${
            message.isOwn
              ? 'bg-primary-500 text-white' :'bg-surface border border-border text-text-primary'
          } ${
            isFirst && isLast
              ? 'rounded-2xl'
              : isFirst
              ? message.isOwn
                ? 'rounded-br-md' :'rounded-bl-md'
              : isLast
              ? message.isOwn
                ? 'rounded-tr-md' :'rounded-tl-md'
              : message.isOwn
              ? 'rounded-r-md' :'rounded-l-md'
          }`}
        >
          {/* Message Content */}
          {message.content && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          )}
          
          {/* Attachments */}
          {renderAttachments(message.attachments)}

          {/* Message Info */}
          <div className={`flex items-center justify-between mt-1 ${
            message.isOwn ? 'text-white/70' : 'text-text-muted'
          }`}>
            <span className="text-xs">
              {formatTime(message.timestamp)}
            </span>
            {message.isOwn && (
              <div className="ml-2">
                {getStatusIcon(message.status)}
              </div>
            )}
          </div>
        </div>

        {/* Message Actions */}
        {showActions && (
          <div className={`flex items-center space-x-1 mt-1 ${
            message.isOwn ? 'justify-end' : 'justify-start'
          }`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-muted hover:text-text-secondary p-1"
              title="Reply"
            >
              <Icon name="Reply" size={12} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-muted hover:text-text-secondary p-1"
              title="Forward"
            >
              <Icon name="Forward" size={12} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-muted hover:text-text-secondary p-1"
              title="More"
            >
              <Icon name="MoreHorizontal" size={12} />
            </Button>
          </div>
        )}

        {/* Timestamp for first message of the day */}
        {isFirst && (
          <div className="text-center mt-2 mb-4">
            <span className="text-xs text-text-muted bg-surface px-2 py-1 rounded-full">
              {formatDistance(message.timestamp, new Date(), { addSuffix: true })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;