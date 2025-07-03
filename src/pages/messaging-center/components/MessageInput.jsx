import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, onFileUpload, disabled }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const textareaRef = useRef(null);

  const quickTemplates = [
    'Thanks for your message!',
    'I\'ll get back to you shortly.',
    'Could you please provide more details?',
    'The project is on track.',
    'I\'ve sent the files for your review.',
    'Let\'s schedule a call to discuss.',
    'Great work! I\'m satisfied with the results.',
    'Could you make these revisions?'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setIsTyping(false);
      adjustTextareaHeight();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  const insertTemplate = (template) => {
    setMessage(prev => prev + (prev ? ' ' : '') + template);
    setShowTemplates(false);
    textareaRef.current?.focus();
    setTimeout(adjustTextareaHeight, 0);
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    textareaRef.current?.focus();
  };

  const commonEmojis = ['😊', '👍', '👎', '❤️', '😄', '😅', '🎉', '🔥', '💯', '👏'];

  return (
    <div className="space-y-3">
      {/* Quick Templates */}
      {showTemplates && (
        <div className="bg-surface-hover rounded-lg p-3 border border-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-text-primary">Quick Templates</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(false)}
              className="p-1"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {quickTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => insertTemplate(template)}
                className="text-left p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded transition-colors"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-surface rounded-lg border border-border p-3">
        <div className="flex items-end space-x-2">
          {/* Attachments Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onFileUpload}
            className="text-text-secondary hover:text-text-primary p-2 flex-shrink-0"
            title="Attach files"
          >
            <Icon name="Paperclip" size={18} />
          </Button>

          {/* Message Input */}
          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={disabled}
              className="w-full resize-none border-0 bg-transparent text-text-primary placeholder-text-muted focus:ring-0 focus:outline-none text-sm leading-relaxed"
              style={{ minHeight: '20px', maxHeight: '120px' }}
              rows={1}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            {/* Emoji Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary hover:text-text-primary p-2"
                title="Add emoji"
              >
                <Icon name="Smile" size={18} />
              </Button>
              
              {/* Emoji Picker (simplified) */}
              {false && (
                <div className="absolute bottom-full right-0 mb-2 bg-surface border border-border rounded-lg p-2 shadow-elevation-3">
                  <div className="grid grid-cols-5 gap-1">
                    {commonEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => handleEmojiClick(emoji)}
                        className="p-1 hover:bg-surface-hover rounded text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Templates Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-text-secondary hover:text-text-primary p-2"
              title="Quick templates"
            >
              <Icon name="FileText" size={18} />
            </Button>

            {/* Send Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              disabled={!message.trim() || disabled}
              className="px-4 py-2"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="mt-2 text-xs text-text-muted">
            Press Enter to send, Shift+Enter for new line
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInput;