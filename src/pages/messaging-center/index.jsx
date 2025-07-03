import React, { useState, useEffect, useRef } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import ConversationList from './components/ConversationList';
import ChatInterface from './components/ChatInterface';
import MessageSearch from './components/MessageSearch';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';


const MessagingCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      participant: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40',
        status: 'online',
        role: 'client'
      },
      lastMessage: {
        content: 'Thanks for the logo design! When can we discuss the next phase?',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        unread: true
      },
      project: {
        title: 'Brand Identity Design',
        id: 'PRJ-001'
      },
      unreadCount: 2,
      messages: [
        {
          id: 1,
          sender: 'Sarah Johnson',
          content: 'Hi there! I saw your portfolio and I\'m interested in hiring you for a logo design project.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isOwn: false,
          status: 'delivered'
        },
        {
          id: 2,
          sender: 'You',
          content: 'Hello Sarah! Thank you for reaching out. I\'d be happy to help with your logo design. Could you tell me more about your brand and what you\'re looking for?',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          isOwn: true,
          status: 'delivered'
        },
        {
          id: 3,
          sender: 'Sarah Johnson',
          content: 'Thanks for the logo design! When can we discuss the next phase?',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          isOwn: false,
          status: 'delivered'
        }
      ]
    },
    {
      id: 2,
      participant: {
        name: 'Mike Chen',
        avatar: '/api/placeholder/40/40',
        status: 'offline',
        role: 'client'
      },
      lastMessage: {
        content: 'Could you send me the latest version of the website mockups?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unread: false
      },
      project: {
        title: 'E-commerce Website',
        id: 'PRJ-002'
      },
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'Mike Chen',
          content: 'Could you send me the latest version of the website mockups?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isOwn: false,
          status: 'delivered'
        }
      ]
    },
    {
      id: 3,
      participant: {
        name: 'Jennifer Davis',
        avatar: '/api/placeholder/40/40',
        status: 'online',
        role: 'freelancer'
      },
      lastMessage: {
        content: 'I\'ve completed the content writing for your blog. Please review when you have time.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        unread: true
      },
      project: {
        title: 'Blog Content Writing',
        id: 'PRJ-003'
      },
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: 'Jennifer Davis',
          content: 'I\'ve completed the content writing for your blog. Please review when you have time.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          isOwn: false,
          status: 'delivered'
        }
      ]
    }
  ];

  useEffect(() => {
    setConversations(mockConversations);
    // Auto-select first conversation on desktop
    if (window.innerWidth >= 1024) {
      setSelectedConversation(mockConversations[0]);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    
    // Mark messages as read
    const updatedConversations = conversations.map(conv => 
      conv.id === conversation.id 
        ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, unread: false } }
        : conv
    );
    setConversations(updatedConversations);
  };

  const handleSendMessage = (content, attachments = []) => {
    if (!selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      content,
      timestamp: new Date(),
      isOwn: true,
      status: 'sending',
      attachments
    };

    // Update conversation with new message
    const updatedConversations = conversations.map(conv => 
      conv.id === selectedConversation.id 
        ? { 
            ...conv, 
            messages: [...conv.messages, newMessage],
            lastMessage: {
              content,
              timestamp: new Date(),
              unread: false
            }
          }
        : conv
    );

    setConversations(updatedConversations);
    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    // Simulate message delivery
    setTimeout(() => {
      const deliveredMessage = { ...newMessage, status: 'delivered' };
      const finalConversations = conversations.map(conv => 
        conv.id === selectedConversation.id 
          ? { 
              ...conv, 
              messages: conv.messages.map(msg => 
                msg.id === newMessage.id ? deliveredMessage : msg
              )
            }
          : conv
      );
      setConversations(finalConversations);
      setSelectedConversation(prev => ({
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === newMessage.id ? deliveredMessage : msg
        )
      }));
    }, 1000);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Messages {totalUnreadCount > 0 ? `(${totalUnreadCount})` : ''} - FreelanceHub</title>
        <meta name="description" content="Secure messaging center for freelancers and clients to communicate about projects." />
        <meta name="keywords" content="messaging, communication, freelance chat, project communication" />
      </Helmet>

      {/* Global Header */}
      <GlobalHeader />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {/* Desktop Navigation */}
        <div className="hidden lg:block bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <PrimaryNavigation />
            </div>
          </div>
        </div>

        {/* Messaging Interface */}
        <div className="max-w-7xl mx-auto h-[calc(100vh-64px)] lg:h-[calc(100vh-144px)]">
          {/* Mobile View */}
          {isMobileView && (
            <div className="h-full">
              {!selectedConversation ? (
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-surface border-b border-border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-xl font-semibold text-text-primary">
                        Messages
                      </h1>
                      <span className="text-sm text-text-secondary">
                        {totalUnreadCount > 0 && `${totalUnreadCount} unread`}
                      </span>
                    </div>
                    <MessageSearch 
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                    />
                  </div>

                  {/* Conversations List */}
                  <div className="flex-1 overflow-y-auto">
                    <ConversationList
                      conversations={filteredConversations}
                      selectedConversation={selectedConversation}
                      onConversationSelect={handleConversationSelect}
                    />
                  </div>
                </div>
              ) : (
                <ChatInterface
                  conversation={selectedConversation}
                  onSendMessage={handleSendMessage}
                  onBack={handleBackToList}
                  isMobile={true}
                />
              )}
            </div>
          )}

          {/* Desktop View */}
          {!isMobileView && (
            <div className="h-full flex">
              {/* Left Panel - Conversations */}
              <div className="w-80 bg-surface border-r border-border flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-text-primary">
                      Messages
                    </h1>
                    <span className="text-sm text-text-secondary">
                      {totalUnreadCount > 0 && `${totalUnreadCount} unread`}
                    </span>
                  </div>
                  <MessageSearch 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto">
                  <ConversationList
                    conversations={filteredConversations}
                    selectedConversation={selectedConversation}
                    onConversationSelect={handleConversationSelect}
                  />
                </div>
              </div>

              {/* Right Panel - Chat */}
              <div className="flex-1 bg-background">
                {selectedConversation ? (
                  <ChatInterface
                    conversation={selectedConversation}
                    onSendMessage={handleSendMessage}
                    onBack={handleBackToList}
                    isMobile={false}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="MessageCircle" size={32} className="text-primary-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-text-secondary">
                        Choose a conversation from the list to start messaging
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <PrimaryNavigation />
      </div>
    </div>
  );
};

export default MessagingCenter;