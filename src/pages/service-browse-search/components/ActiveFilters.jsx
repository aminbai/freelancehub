import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    // Category filters
    if (filters.category && filters.category.length > 0) {
      filters.category.forEach(cat => {
        chips.push({
          type: 'category',
          value: cat,
          label: cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          id: `category-${cat}`
        });
      });
    }

    // Subcategory filters
    if (filters.subcategory && filters.subcategory.length > 0) {
      filters.subcategory.forEach(subcat => {
        chips.push({
          type: 'subcategory',
          value: subcat,
          label: subcat,
          id: `subcategory-${subcat}`
        });
      });
    }

    // Price range filter
    if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000)) {
      chips.push({
        type: 'priceRange',
        value: filters.priceRange,
        label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
        id: 'price-range'
      });
    }

    // Delivery time filters
    if (filters.deliveryTime && filters.deliveryTime.length > 0) {
      filters.deliveryTime.forEach(time => {
        chips.push({
          type: 'deliveryTime',
          value: time,
          label: time,
          id: `delivery-${time}`
        });
      });
    }

    // Seller level filters
    if (filters.sellerLevel && filters.sellerLevel.length > 0) {
      filters.sellerLevel.forEach(level => {
        chips.push({
          type: 'sellerLevel',
          value: level,
          label: level.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          id: `seller-${level}`
        });
      });
    }

    // Rating filter
    if (filters.rating && filters.rating > 0) {
      chips.push({
        type: 'rating',
        value: filters.rating,
        label: `${filters.rating}+ Stars`,
        id: 'rating'
      });
    }

    return chips;
  };

  const handleRemoveFilter = (chip) => {
    onRemoveFilter(chip.type, chip.value);
  };

  const filterChips = getFilterChips();

  if (filterChips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-medium text-text-secondary">
        Active filters:
      </span>
      
      {filterChips.map((chip) => (
        <div
          key={chip.id}
          className="flex items-center space-x-1 bg-primary-50 text-primary px-3 py-1.5 rounded-full text-sm border border-primary-200"
        >
          <span className="font-medium">{chip.label}</span>
          <button
            onClick={() => handleRemoveFilter(chip)}
            className="ml-1 hover:bg-primary-100 rounded-full p-0.5 transition-colors"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      ))}
      
      {filterChips.length > 1 && (
        <Button
          variant="ghost"
          onClick={onClearAll}
          className="text-sm text-text-secondary hover:text-text-primary px-3 py-1.5"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;