import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalHeader = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(3);
  
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
    }
  };

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
    setTimeout(() => {
      const searchInput = searchRef.current?.querySelector('input');
      searchInput?.focus();
    }, 100);
  };

  const notifications = [
    { id: 1, title: 'New order received', message: 'John Doe placed an order for Web Design', time: '2 min ago', unread: true },
    { id: 2, title: 'Payment completed', message: 'Your payment of $250 has been processed', time: '1 hour ago', unread: true },
    { id: 3, title: 'Project milestone', message: 'Logo Design project milestone completed', time: '3 hours ago', unread: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/marketplace-homepage" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Icon name="Briefcase" size={20} color="white" className="lg:w-6 lg:h-6" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-text-primary font-heading">
                FreelanceHub
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <Input
                  type="search"
                  placeholder="Search services, freelancers, or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <Button
                variant="ghost"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
              >
                <Icon name="Bell" size={20} className="text-text-secondary" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {notificationCount}
                  </span>
                )}
              </Button>

              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg shadow-elevation-3 border border-border z-1300 animate-slide-down">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-text-primary">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors duration-200 ${
                          notification.unread ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-primary' : 'bg-border'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-text-primary text-sm">{notification.title}</p>
                            <p className="text-text-secondary text-sm mt-1">{notification.message}</p>
                            <p className="text-text-muted text-xs mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border">
                    <Button variant="ghost" className="w-full text-primary hover:bg-primary-50">
                      View all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <Icon name="ChevronDown" size={16} className="text-text-secondary" />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-lg shadow-elevation-3 border border-border z-1300 animate-slide-down">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium text-text-primary">John Doe</p>
                    <p className="text-text-secondary text-sm">john@example.com</p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/user-registration-login"
                      className="flex items-center space-x-3 px-4 py-2 text-text-primary hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name="User" size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/order-management"
                      className="flex items-center space-x-3 px-4 py-2 text-text-primary hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name="Package" size={16} />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      to="/marketplace-homepage"
                      className="flex items-center space-x-3 px-4 py-2 text-text-primary hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </Link>
                  </div>
                  <div className="border-t border-border py-2">
                    <button className="flex items-center space-x-3 px-4 py-2 text-error hover:bg-error-50 transition-colors duration-200 w-full text-left">
                      <Icon name="LogOut" size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              onClick={handleSearchExpand}
              className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
            >
              <Icon name="Search" size={20} className="text-text-secondary" />
            </Button>

            {/* Mobile Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
              >
                <Icon name="Bell" size={20} className="text-text-secondary" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} className="text-text-secondary" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        {isSearchExpanded && (
          <div className="lg:hidden pb-4" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
              <Input
                type="search"
                placeholder="Search services, freelancers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                variant="ghost"
                onClick={() => setIsSearchExpanded(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
              >
                <Icon name="X" size={16} className="text-text-secondary" />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface">
            <div className="py-4 space-y-2">
              <Link
                to="/marketplace-homepage"
                className="flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-surface-hover transition-colors duration-200 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="Home" size={20} />
                <span>Home</span>
              </Link>
              <Link
                to="/service-browse-search"
                className="flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-surface-hover transition-colors duration-200 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="Search" size={20} />
                <span>Browse Services</span>
              </Link>
              <Link
                to="/order-management"
                className="flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-surface-hover transition-colors duration-200 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="Package" size={20} />
                <span>My Orders</span>
              </Link>
              <Link
                to="/user-registration-login"
                className="flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-surface-hover transition-colors duration-200 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="User" size={20} />
                <span>Account</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;