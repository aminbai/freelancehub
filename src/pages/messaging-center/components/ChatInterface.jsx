import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import FileUpload from './FileUpload';


const ChatInterface = ({ conversation, onSendMessage, onBack, isMobile }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content, attachments = []) => {
    if (content.trim() || attachments.length > 0) {
      onSendMessage(content, attachments);
      
      // Simulate typing indicator for response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleFileUpload = (files) => {
    const attachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    
    onSendMessage('', attachments);
    setShowFileUpload(false);
  };

  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-success-500' : 'bg-border';
  };

  if (!conversation) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-surface border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mr-2"
            >
              <Icon name="ArrowLeft" size={16} />
            </Button>
          )}
          
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {conversation.participant.name.charAt(0)}
              </span>
            </div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.participant.status)}`}></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-text-primary">
              {conversation.participant.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span className="capitalize">{conversation.participant.status}</span>
              <span>•</span>
              <span>{conversation.project.title}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="Phone" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="Video" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-background"
      >
        {conversation.messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isFirst={index === 0 || conversation.messages[index - 1].sender !== message.sender}
            isLast={index === conversation.messages.length - 1 || conversation.messages[index + 1].sender !== message.sender}
          />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xs">
                {conversation.participant.name.charAt(0)}
              </span>
            </div>
            <div className="bg-surface border border-border rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border p-4 bg-surface">
        <MessageInput
          onSendMessage={handleSendMessage}
          onFileUpload={() => setShowFileUpload(true)}
         
        />
      </div>

      {/* File Upload Modal */}
      {showFileUpload && (
        <FileUpload
          onUpload={handleFileUpload}
          onClose={() => setShowFileUpload(false)}
        />
      )}
    </div>
  );
};

export default ChatInterface;