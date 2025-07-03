import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedServices = ({ services, currentServiceId }) => {
  const filteredServices = services.filter(service => service.id !== currentServiceId);

  if (filteredServices.length === 0) {
    return null;
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={`${
          index < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Related Services</h3>
        <Link
          to="/service-browse-search"
          className="text-primary text-sm hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {filteredServices.slice(0, 3).map((service) => (
          <Link
            key={service.id}
            to="/service-detail-page"
            className="group bg-surface border border-border rounded-lg overflow-hidden hover:shadow-soft transition-all duration-200"
          >
            <div className="aspect-video overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {service.title}
              </h4>
              
              <div className="flex items-center space-x-2 mb-2">
                <Image
                  src={service.seller.avatar}
                  alt={service.seller.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-text-secondary text-sm">{service.seller.name}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {renderStars(service.rating)}
                  <span className="text-text-secondary text-sm ml-1">
                    ({service.reviewCount})
                  </span>
                </div>
                <div className="text-text-primary font-semibold">
                  From ${service.startingPrice}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="lg:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {filteredServices.slice(0, 5).map((service) => (
            <Link
              key={service.id}
              to="/service-detail-page"
              className="group flex-shrink-0 w-64 bg-surface border border-border rounded-lg overflow-hidden hover:shadow-soft transition-all duration-200"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h4>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Image
                    src={service.seller.avatar}
                    alt={service.seller.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-text-secondary text-sm">{service.seller.name}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {renderStars(service.rating)}
                    <span className="text-text-secondary text-sm ml-1">
                      ({service.reviewCount})
                    </span>
                  </div>
                  <div className="text-text-primary font-semibold">
                    From ${service.startingPrice}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* View More Button for Mobile */}
      <div className="lg:hidden text-center">
        <Button
          variant="outline"
          onClick={() => window.location.href = '/service-browse-search'}
          className="w-full"
        >
          View More Related Services
        </Button>
      </div>
    </div>
  );
};

export default RelatedServices;