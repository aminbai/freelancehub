import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SellerSidebar = ({ seller }) => {
  const handleContactSeller = () => {
    // Mock contact functionality
    console.log('Contacting seller');
  };

  return (
    <div className="space-y-6">
      {/* Seller Profile Card */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="text-center mb-4">
          <Link to="/user-registration-login" className="inline-block">
            <Image
              src={seller.avatar}
              alt={seller.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-border"
            />
          </Link>
          <Link
            to="/user-registration-login"
            className="block font-semibold text-text-primary hover:text-primary transition-colors"
          >
            {seller.name}
          </Link>
          <p className="text-text-secondary text-sm">{seller.title}</p>
          
          <div className="flex items-center justify-center space-x-1 mt-2">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="font-medium text-text-primary">{seller.rating}</span>
            <span className="text-text-secondary text-sm">({seller.reviewCount})</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Level</span>
            <span className="font-medium text-text-primary">{seller.level}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Response Time</span>
            <span className="font-medium text-text-primary">{seller.responseTime}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Recent Delivery</span>
            <span className="font-medium text-text-primary">{seller.recentDelivery}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Orders Completed</span>
            <span className="font-medium text-text-primary">{seller.ordersCompleted}</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleContactSeller}
          className="w-full mb-3"
        >
          <Icon name="MessageCircle" size={16} className="mr-2" />
          Contact Seller
        </Button>

        <div className="flex items-center justify-center space-x-1 text-sm text-text-secondary">
          <Icon name="Clock" size={14} />
          <span>Usually responds within {seller.responseTime}</span>
        </div>
      </div>

      {/* Seller Stats */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4">Seller Statistics</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-text-secondary">Order Completion</span>
              <span className="font-medium text-text-primary">{seller.stats.completionRate}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className="bg-success rounded-full h-2 transition-all duration-300"
                style={{ width: `${seller.stats.completionRate}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-text-secondary">On-Time Delivery</span>
              <span className="font-medium text-text-primary">{seller.stats.onTimeDelivery}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${seller.stats.onTimeDelivery}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-text-secondary">Repeat Clients</span>
              <span className="font-medium text-text-primary">{seller.stats.repeatClients}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className="bg-accent rounded-full h-2 transition-all duration-300"
                style={{ width: `${seller.stats.repeatClients}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {seller.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4">Languages</h3>
        <div className="space-y-2">
          {seller.languages.map((language, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-text-primary">{language.name}</span>
              <span className="text-text-secondary">{language.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Samples */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary">Portfolio</h3>
          <Link
            to="/user-registration-login"
            className="text-primary text-sm hover:underline"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {seller.portfolio.slice(0, 4).map((item, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Member Since */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} className="text-text-secondary" />
          <div>
            <p className="text-text-secondary text-sm">Member since</p>
            <p className="font-medium text-text-primary">{seller.memberSince}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSidebar;