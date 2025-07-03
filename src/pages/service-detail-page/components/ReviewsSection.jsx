import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const ratingBreakdown = {
    5: Math.floor(totalReviews * 0.6),
    4: Math.floor(totalReviews * 0.25),
    3: Math.floor(totalReviews * 0.1),
    2: Math.floor(totalReviews * 0.03),
    1: Math.floor(totalReviews * 0.02)
  };

  const filteredReviews = selectedRating === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(selectedRating));

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const displayedReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

  const renderStars = (rating, size = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={size}
        className={`${
          index < rating ? 'text-warning fill-current' : 'text-border'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-text-primary">{averageRating}</span>
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(averageRating), 20)}
              </div>
            </div>
            <p className="text-text-secondary">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingBreakdown[rating];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm text-text-secondary">{rating}</span>
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                  </div>
                  <div className="flex-1 bg-background rounded-full h-2">
                    <div
                      className="bg-warning rounded-full h-2 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-8 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedRating === 'all' ? 'primary' : 'outline'}
          onClick={() => {
            setSelectedRating('all');
            setCurrentPage(1);
          }}
          className="text-sm"
        >
          All Reviews ({totalReviews})
        </Button>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingBreakdown[rating];
          if (count === 0) return null;
          
          return (
            <Button
              key={rating}
              variant={selectedRating === rating.toString() ? 'primary' : 'outline'}
              onClick={() => {
                setSelectedRating(rating.toString());
                setCurrentPage(1);
              }}
              className="text-sm"
            >
              {rating} Star{rating !== 1 ? 's' : ''} ({count})
            </Button>
          );
        })}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border border-border rounded-lg p-4 bg-surface">
            <div className="flex items-start space-x-4">
              <Image
                src={review.user.avatar}
                alt={review.user.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-text-primary">{review.user.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating, 14)}
                      </div>
                      <span className="text-text-muted text-sm">•</span>
                      <span className="text-text-secondary text-sm">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                  
                  {review.verified && (
                    <div className="flex items-center space-x-1 text-success text-sm">
                      <Icon name="CheckCircle" size={14} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                <p className="text-text-secondary mb-3 leading-relaxed">
                  {review.comment}
                </p>

                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover border border-border"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-text-muted">
                    <button className="flex items-center space-x-1 hover:text-text-secondary transition-colors">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful ({review.helpfulCount})</span>
                    </button>
                  </div>
                  
                  {review.orderDate && (
                    <span className="text-text-muted">
                      Order completed: {formatDate(review.orderDate)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'primary' : 'outline'}
              onClick={() => setCurrentPage(page)}
              className="px-3 py-2 min-w-[40px]"
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;