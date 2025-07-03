import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      id: 'discover',
      label: 'Discover',
      icon: 'Compass',
      paths: ['/marketplace-homepage', '/service-browse-search', '/service-detail-page'],
      defaultPath: '/marketplace-homepage'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'Package',
      paths: ['/order-placement-checkout', '/order-management'],
      defaultPath: '/order-management'
    },
    {
      id: 'account',
      label: 'Account',
      icon: 'User',
      paths: ['/user-registration-login'],
      defaultPath: '/user-registration-login'
    }
  ];

  const isActiveSection = (item) => {
    return item.paths.some(path => location.pathname === path || location.pathname.startsWith(path));
  };

  const getActiveItem = () => {
    return navigationItems.find(item => isActiveSection(item));
  };

  return (
    <>
      {/* Desktop Navigation - Integrated into Header */}
      <nav className="hidden lg:flex items-center space-x-8">
        {navigationItems.map((item) => {
          const isActive = isActiveSection(item);
          return (
            <Link
              key={item.id}
              to={item.defaultPath}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'text-primary bg-primary-50 border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              <Icon 
                name={item.icon} 
                size={18} 
                className={isActive ? 'text-primary' : 'text-current'} 
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation - Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-1000">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const isActive = isActiveSection(item);
            return (
              <Link
                key={item.id}
                to={item.defaultPath}
                className={`flex flex-col items-center justify-center py-2 px-4 min-w-0 flex-1 transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                  isActive ? 'bg-primary-50' : 'hover:bg-surface-hover'
                }`}>
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActive ? 'text-primary' : 'text-current'} 
                  />
                </div>
                <span className={`text-xs font-medium mt-1 transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-text-secondary'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Section Indicator for Desktop */}
      <div className="hidden lg:block">
        {getActiveItem() && (
          <div className="bg-primary-50 border-l-4 border-primary px-4 py-2 mb-6">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getActiveItem().icon} 
                size={16} 
                className="text-primary" 
              />
              <span className="text-primary font-medium text-sm">
                {getActiveItem().label} Section
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PrimaryNavigation;