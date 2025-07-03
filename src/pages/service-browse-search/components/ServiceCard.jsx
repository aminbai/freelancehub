import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(service?.isFavorited || false);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onToggleFavorite?.(service?.id);
  };

  const handleQuickPreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick preview functionality would be implemented here
    console.log('Quick preview for service:', service?.id);
  };

  return (
    <div 
      className="bg-surface rounded-lg border border-border hover:shadow-soft-hover transition-all duration-300 group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/service-detail-page?id=${service?.id}`} className="block">
        {/* Service Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={service?.thumbnail || '/assets/images/no_image.png'} 
            alt={service?.title || 'Service'} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isFavorited 
                ? 'bg-error text-white' :'bg-surface/80 text-text-secondary hover:bg-surface hover:text-error'
            }`}
          >
            <Icon 
              name={isFavorited ? 'Heart' : 'Heart'} 
              size={16} 
              className={isFavorited ? 'fill-current' : ''} 
            />
          </button>

          {/* Quick Preview Button - Desktop Only */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex">
              <Button
                variant="primary"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={handleQuickPreview}
                className="backdrop-blur-sm"
              >
                Quick Preview
              </Button>
            </div>
          )}

          {/* Service Level Badge */}
          {service?.level && (
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                service.level === 'Pro' ?'bg-primary text-white' 
                  : service.level === 'Top Rated' ?'bg-success text-white' :'bg-surface text-text-secondary'
              }`}>
                {service.level}
              </span>
            </div>
          )}
        </div>

        {/* Service Content */}
        <div className="p-4">
          {/* Seller Info */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img 
                src={service?.seller?.avatar || '/assets/images/no_image.png'} 
                alt={service?.seller?.name || 'Seller'} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-text-secondary font-medium">
              {service?.seller?.name || 'Anonymous'}
            </span>
            {service?.seller?.isVerified && (
              <Icon name="CheckCircle" size={14} className="text-success" />
            )}
          </div>

          {/* Service Title */}
          <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {service?.title || 'Service Title'}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={14}
                  className={`${
                    star <= (service?.rating || 0) 
                      ? 'text-warning fill-current' :'text-border'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-text-primary">
              {service?.rating || '0.0'}
            </span>
            <span className="text-sm text-text-secondary">
              ({service?.reviewCount || 0})
            </span>
          </div>

          {/* Pricing and Delivery */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-text-secondary">Starting at</span>
              <span className="font-bold text-text-primary">
                ${service?.startingPrice || '0'}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-text-secondary">
              <Icon name="Clock" size={14} />
              <span>{service?.deliveryTime || 'N/A'}</span>
            </div>
          </div>

          {/* Service Tags */}
          {service?.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {service.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-surface-hover text-text-secondary rounded-full"
                >
                  {tag}
                </span>
              ))}
              {service.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-surface-hover text-text-secondary rounded-full">
                  +{service.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;