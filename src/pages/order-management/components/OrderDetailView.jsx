import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderDetailView = ({ order, onClose, onStatusUpdate, onSendMessage }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [messageText, setMessageText] = useState('');
  const [revisionText, setRevisionText] = useState('');

  if (!order) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'messages', label: 'Messages', icon: 'MessageCircle' },
    { id: 'files', label: 'Files', icon: 'Paperclip' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: 'client',
      senderName: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      message: 'Hi! I wanted to discuss some changes to the design. Can we schedule a call?',
      timestamp: new Date(Date.now() - 3600000),
      attachments: []
    },
    {
      id: 2,
      sender: 'freelancer',
      senderName: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      message: 'Of course! I\'m available tomorrow afternoon. What specific changes did you have in mind?',
      timestamp: new Date(Date.now() - 1800000),
      attachments: []
    },
    {
      id: 3,
      sender: 'client',
      senderName: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      message: 'I\'ve attached the updated requirements document with the changes highlighted.',
      timestamp: new Date(Date.now() - 900000),
      attachments: [
        { name: 'Updated_Requirements.pdf', size: '2.3 MB', type: 'pdf' }
      ]
    }
  ];

  const mockFiles = [
    {
      id: 1,
      name: 'Website_Mockup_v1.psd',
      size: '15.2 MB',
      type: 'psd',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: new Date(Date.now() - 86400000),
      status: 'approved',
      version: 1
    },
    {
      id: 2,
      name: 'Logo_Variations.ai',
      size: '8.7 MB',
      type: 'ai',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: new Date(Date.now() - 43200000),
      status: 'pending',
      version: 1
    },
    {
      id: 3,
      name: 'Final_Website_Files.zip',
      size: '45.8 MB',
      type: 'zip',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: new Date(Date.now() - 3600000),
      status: 'delivered',
      version: 2
    }
  ];

  const mockTimeline = [
    {
      id: 1,
      event: 'Order Placed',
      description: 'Client placed order for website design',
      timestamp: new Date(Date.now() - 604800000),
      status: 'completed',
      icon: 'ShoppingCart'
    },
    {
      id: 2,
      event: 'Requirements Clarified',
      description: 'Initial discussion about project requirements',
      timestamp: new Date(Date.now() - 518400000),
      status: 'completed',
      icon: 'MessageCircle'
    },
    {
      id: 3,
      event: 'Design Phase Started',
      description: 'Freelancer began working on initial designs',
      timestamp: new Date(Date.now() - 432000000),
      status: 'completed',
      icon: 'Palette'
    },
    {
      id: 4,
      event: 'First Draft Delivered',
      description: 'Initial mockups and designs submitted',
      timestamp: new Date(Date.now() - 172800000),
      status: 'completed',
      icon: 'Upload'
    },
    {
      id: 5,
      event: 'Revision Requested',
      description: 'Client requested changes to color scheme',
      timestamp: new Date(Date.now() - 86400000),
      status: 'completed',
      icon: 'RotateCcw'
    },
    {
      id: 6,
      event: 'Final Delivery',
      description: 'All files and assets delivered',
      timestamp: new Date(),
      status: 'current',
      icon: 'CheckCircle'
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(order.id, messageText);
      setMessageText('');
    }
  };

  const handleRequestRevision = () => {
    if (revisionText.trim()) {
      onStatusUpdate(order.id, 'revision_requested', revisionText);
      setRevisionText('');
    }
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'psd': case'ai':
        return 'Image';
      case 'zip':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1400 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation-4 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
              <Image
                src={order.thumbnail}
                alt={order.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{order.title}</h2>
              <p className="text-text-secondary">Order #{order.id}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-text-muted text-sm mb-1">Status</p>
                  <p className="font-semibold text-text-primary">{order.status}</p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-text-muted text-sm mb-1">Amount</p>
                  <p className="font-semibold text-text-primary">${order.amount.toLocaleString()}</p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-text-muted text-sm mb-1">Deadline</p>
                  <p className="font-semibold text-text-primary">
                    {new Date(order.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-text-muted text-sm mb-1">Progress</p>
                  <p className="font-semibold text-text-primary">{order.progress || 0}%</p>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <h3 className="font-semibold text-text-primary mb-3">Project Description</h3>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-text-secondary leading-relaxed">
                    {order.description || `Complete website design and development for a modern business website. The project includes:\n\n• Homepage design with hero section\n• About us page with team information\n• Services page with detailed offerings\n• Contact page with form integration\n• Responsive design for all devices\n• SEO optimization\n• Performance optimization\n\nThe design should be modern, professional, and align with the brand guidelines provided.`}
                  </p>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <h3 className="font-semibold text-text-primary mb-3">Deliverables</h3>
                <div className="space-y-2">
                  {[
                    { item: 'Homepage Design', completed: true },
                    { item: 'About Page Design', completed: true },
                    { item: 'Services Page Design', completed: true },
                    { item: 'Contact Page Design', completed: false },
                    { item: 'Mobile Responsive Design', completed: false },
                    { item: 'Final Files & Assets', completed: false }
                  ].map((deliverable, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        deliverable.completed
                          ? 'bg-success border-success' :'border-border'
                      }`}>
                        {deliverable.completed && (
                          <Icon name="Check" size={12} color="white" />
                        )}
                      </div>
                      <span className={`${
                        deliverable.completed
                          ? 'text-text-primary line-through' :'text-text-secondary'
                      }`}>
                        {deliverable.item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                {order.status.toLowerCase() === 'active' && (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => onStatusUpdate(order.id, 'delivered')}
                    >
                      Mark as Delivered
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab('messages')}
                    >
                      Send Message
                    </Button>
                  </>
                )}
                {order.status.toLowerCase() === 'delivered' && (
                  <Button
                    variant="warning"
                    onClick={() => handleRequestRevision()}
                  >
                    Request Revision
                  </Button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              {/* Messages List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {mockMessages.map((message) => (
                  <div key={message.id} className="flex space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={message.avatar}
                        alt={message.senderName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-text-primary text-sm">
                          {message.senderName}
                        </span>
                        <span className="text-text-muted text-xs">
                          {message.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-background p-3 rounded-lg">
                        <p className="text-text-secondary text-sm">{message.message}</p>
                        {message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 text-xs text-primary">
                                <Icon name="Paperclip" size={12} />
                                <span>{attachment.name}</span>
                                <span className="text-text-muted">({attachment.size})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-border pt-4">
                <div className="flex space-x-3">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button variant="primary" onClick={handleSendMessage}>
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-4">
              {mockFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                      <Icon name={getFileIcon(file.type)} size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{file.name}</p>
                      <p className="text-text-secondary text-sm">
                        {file.size} • Uploaded by {file.uploadedBy} • {file.uploadedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      file.status === 'approved' ? 'bg-success-50 text-success' :
                      file.status === 'pending'? 'bg-warning-50 text-warning' : 'bg-primary-50 text-primary'
                    }`}>
                      {file.status}
                    </span>
                    <Button variant="ghost" className="p-2">
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {mockTimeline.map((event, index) => (
                <div key={event.id} className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      event.status === 'completed' ? 'bg-success text-white' :
                      event.status === 'current'? 'bg-primary text-white' : 'bg-background border-2 border-border text-text-muted'
                    }`}>
                      <Icon name={event.icon} size={16} />
                    </div>
                    {index < mockTimeline.length - 1 && (
                      <div className={`w-0.5 h-8 mt-2 ${
                        event.status === 'completed' ? 'bg-success' : 'bg-border'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className="font-medium text-text-primary">{event.event}</h4>
                    <p className="text-text-secondary text-sm mt-1">{event.description}</p>
                    <p className="text-text-muted text-xs mt-2">
                      {event.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailView;