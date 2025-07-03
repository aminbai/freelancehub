import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceGrid = ({ 
  services = [], 
  loading = false, 
  hasMore = false, 
  onLoadMore, 
  onToggleFavorite,
  onRefresh 
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);

  // Pull to refresh functionality
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && touchStartY > 0) {
      const touchY = e.touches[0].clientY;
      const distance = touchY - touchStartY;
      
      if (distance > 0) {
        setPullDistance(Math.min(distance, 100));
        if (distance > 80) {
          e.preventDefault();
        }
      }
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > 80) {
      setRefreshing(true);
      try {
        await onRefresh?.();
      } finally {
        setRefreshing(false);
      }
    }
    setTouchStartY(0);
    setPullDistance(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (pullDistance > 0) {
        setPullDistance(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pullDistance]);

  // Skeleton loading component
  const ServiceCardSkeleton = () => (
    <div className="bg-surface rounded-lg border border-border animate-pulse">
      <div className="aspect-video bg-surface-hover rounded-t-lg"></div>
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-surface-hover rounded-full"></div>
          <div className="h-4 bg-surface-hover rounded w-24"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-surface-hover rounded w-full"></div>
          <div className="h-4 bg-surface-hover rounded w-3/4"></div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-4 bg-surface-hover rounded w-16"></div>
          <div className="h-4 bg-surface-hover rounded w-8"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-surface-hover rounded w-20"></div>
          <div className="h-4 bg-surface-hover rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mb-4">
        <Icon name="Search" size={32} className="text-text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        No services found
      </h3>
      <p className="text-text-secondary mb-6 max-w-md">
        We couldn't find any services matching your criteria. Try adjusting your filters or search terms.
      </p>
      <Button
        variant="outline"
        onClick={onRefresh}
        iconName="RefreshCw"
        iconPosition="left"
      >
        Refresh Results
      </Button>
    </div>
  );

  return (
    <div className="relative">
      {/* Pull to Refresh Indicator */}
      {pullDistance > 0 && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 bg-primary-50 rounded-lg transition-all duration-200 lg:hidden"
          style={{ transform: `translateY(-${100 - pullDistance}px)`, opacity: pullDistance / 80 }}
        >
          <div className="flex items-center space-x-2 text-primary">
            <Icon 
              name={refreshing ? "RefreshCw" : "ArrowDown"} 
              size={20} 
              className={refreshing ? "animate-spin" : ""} 
            />
            <span className="font-medium">
              {refreshing ? 'Refreshing...' : pullDistance > 80 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}

      {/* Service Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading Skeletons */}
        {loading && services.length === 0 && (
          [...Array(8)].map((_, index) => (
            <ServiceCardSkeleton key={`skeleton-${index}`} />
          ))
        )}

        {/* Service Cards */}
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onToggleFavorite={onToggleFavorite}
          />
        ))}

        {/* Loading More Skeletons */}
        {loading && services.length > 0 && (
          [...Array(4)].map((_, index) => (
            <ServiceCardSkeleton key={`loading-${index}`} />
          ))
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && <EmptyState />}
      </div>

      {/* Load More Button */}
      {!loading && hasMore && services.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            iconName="ArrowDown"
            iconPosition="left"
            size="lg"
          >
            Load More Services
          </Button>
        </div>
      )}

      {/* End of Results */}
      {!loading && !hasMore && services.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm">You've reached the end of results</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceGrid;