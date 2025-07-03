import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceHeader = ({ service, seller }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: service.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleFavorite = () => {
    // Mock favorite functionality
    console.log('Added to favorites');
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-text-secondary">
        <Link to="/marketplace-homepage" className="hover:text-primary transition-colors">
          Home
        </Link>
        <Icon name="ChevronRight" size={14} />
        <Link to="/service-browse-search" className="hover:text-primary transition-colors">
          {service.category}
        </Link>
        <Icon name="ChevronRight" size={14} />
        <span className="text-text-primary font-medium truncate">{service.title}</span>
      </nav>

      {/* Service Title */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary leading-tight">
          {service.title}
        </h1>
        
        {/* Service Tags */}
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Seller Info & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <Link to="/user-registration-login" className="flex-shrink-0">
            <Image
              src={seller.avatar}
              alt={seller.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
          </Link>
          <div>
            <Link
              to="/user-registration-login"
              className="font-semibold text-text-primary hover:text-primary transition-colors"
            >
              {seller.name}
            </Link>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="font-medium">{seller.rating}</span>
                <span className="text-text-secondary">({seller.reviewCount} reviews)</span>
              </div>
              <span className="text-text-muted">•</span>
              <span className="text-text-secondary">{seller.level}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={handleFavorite}
            className="p-2 hover:bg-surface-hover rounded-lg"
          >
            <Icon name="Heart" size={20} className="text-text-secondary" />
          </Button>
          <Button
            variant="ghost"
            onClick={handleShare}
            className="p-2 hover:bg-surface-hover rounded-lg"
          >
            <Icon name="Share2" size={20} className="text-text-secondary" />
          </Button>
        </div>
      </div>

      {/* Service Stats */}
      <div className="flex items-center space-x-6 text-sm text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="Eye" size={16} />
          <span>{service.views} views</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="ShoppingCart" size={16} />
          <span>{service.orders} orders</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={16} />
          <span>Last updated {service.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeader;