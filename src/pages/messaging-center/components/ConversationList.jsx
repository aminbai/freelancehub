import React from 'react';
import Icon from '../../../components/AppIcon';
import { formatDistance } from 'date-fns';

const ConversationList = ({ conversations, selectedConversation, onConversationSelect }) => {
  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-success-500' : 'bg-border';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffInHours = (now - timestamp) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return formatDistance(timestamp, now, { addSuffix: true });
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const truncateMessage = (message, maxLength = 50) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="divide-y divide-border">
      {conversations.length === 0 ? (
        <div className="p-8 text-center">
          <Icon name="MessageCircle" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No conversations found</h3>
          <p className="text-text-secondary">
            Start a new conversation or check your search filters
          </p>
        </div>
      ) : (
        conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onConversationSelect(conversation)}
            className={`p-4 cursor-pointer transition-colors duration-200 hover:bg-surface-hover ${
              selectedConversation?.id === conversation.id 
                ? 'bg-primary-50 border-r-2 border-primary-500' :''
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {conversation.participant.name.charAt(0)}
                  </span>
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.participant.status)}`}></div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary text-sm truncate">
                      {conversation.participant.name}
                    </h4>
                    <p className="text-xs text-text-secondary truncate">
                      {conversation.project.title}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-2">
                    <span className="text-xs text-text-muted">
                      {formatTimestamp(conversation.lastMessage.timestamp)}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-primary-500 text-white text-xs rounded-full">
                        {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Last Message */}
                <div className="flex items-center space-x-2">
                  <p className={`text-sm flex-1 truncate ${
                    conversation.lastMessage.unread 
                      ? 'text-text-primary font-medium' :'text-text-secondary'
                  }`}>
                    {truncateMessage(conversation.lastMessage.content)}
                  </p>
                  
                  {/* Role Badge */}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    conversation.participant.role === 'client' ?'bg-primary-50 text-primary-600' :'bg-secondary-50 text-secondary-600'
                  }`}>
                    {conversation.participant.role}
                  </span>
                </div>

                {/* Project Info */}
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="Folder" size={12} className="text-text-muted" />
                  <span className="text-xs text-text-muted">
                    {conversation.project.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationList;