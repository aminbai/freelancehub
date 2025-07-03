import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortingOptions = ({ currentSort, onSortChange, resultsCount = 0 }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'reviews', label: 'Most Reviews', icon: 'MessageSquare' },
    { value: 'delivery', label: 'Fastest Delivery', icon: 'Zap' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsDropdownOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.label : 'Relevance';
  };

  const getCurrentSortIcon = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.icon : 'Target';
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Results Count */}
      <div className="flex items-center space-x-2">
        <span className="text-text-primary font-medium">
          {resultsCount.toLocaleString()} services found
        </span>
        {resultsCount > 0 && (
          <Icon name="CheckCircle" size={16} className="text-success" />
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 min-w-[180px] justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name={getCurrentSortIcon()} size={16} />
            <span>Sort by: {getCurrentSortLabel()}</span>
          </div>
          <Icon 
            name={isDropdownOpen ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="text-text-secondary" 
          />
        </Button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-surface rounded-lg shadow-elevation-3 border border-border z-1100 animate-slide-down">
            <div className="p-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    currentSort === option.value
                      ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-surface-hover text-text-secondary'
                  }`}
                >
                  <Icon 
                    name={option.icon} 
                    size={16} 
                    className={currentSort === option.value ? 'text-primary' : 'text-text-secondary'} 
                  />
                  <span className={`font-medium ${
                    currentSort === option.value ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {option.label}
                  </span>
                  {currentSort === option.value && (
                    <Icon name="Check" size={14} className="text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingOptions;